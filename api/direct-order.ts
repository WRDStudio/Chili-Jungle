import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getResendClient, SALES_EMAIL, FROM_EMAIL } from './_resend.js';
import { calculateOrderTotals } from '../lib/pricing.js';
import {
  buildDirectOrderSalesNotification,
  buildDirectOrderCustomerConfirmation,
  type DirectOrderData,
} from './_emailTemplates.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // 1. Enforce POST only
    if (req.method !== 'POST') {
      return res.status(405).json({
        error: 'METHOD_NOT_ALLOWED',
        message: 'Only POST requests are allowed.'
      });
    }

    // 2. Extract Data
    const {
      name,
      email,
      phone,
      clasicoQty = 0,
      tropicalQty = 0,
      province,
      canton,
      district,
      address,
      deliveryMethod,
      notes,
      source,
    } = req.body;

    console.log('[direct-order] Incoming request body:', req.body);

    // 3. Server-side validation
    if (!name || !email || !phone || !province || !canton || !district || !address || !deliveryMethod) {
      return res.status(400).json({
        error: 'MISSING_FIELDS',
        message: 'Falta completar algunos campos'
      });
    }

    // Email validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({
        error: 'INVALID_EMAIL',
        message: 'Revisá el correo electrónico'
      });
    }

    // Check quantities
    const cQty = parseInt(clasicoQty, 10) || 0;
    const tQty = parseInt(tropicalQty, 10) || 0;

    if (cQty < 0 || tQty < 0 || (cQty === 0 && tQty === 0)) {
       return res.status(400).json({
        error: 'INVALID_QUANTITY',
        message: 'Selecciona al menos un producto'
      });
    }

    // 4. Server-Side Pricing Recalculation (Never trust the frontend)
    const totals = calculateOrderTotals(cQty, tQty);

    const orderData: DirectOrderData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      clasicoQty: cQty,
      tropicalQty: tQty,
      totalUnits: totals.totalUnits,
      totalUSD: totals.totalUSD,
      totalCRC: totals.totalCRC,
      province,
      canton,
      district,
      address,
      deliveryMethod,
      notes,
      source: source || 'direct',
      submittedAt: new Date().toISOString(),
    };

    // 5. Initialize Resend safely within try/catch
    const resend = getResendClient();

    // 6. Build Emails
    const salesEmail = buildDirectOrderSalesNotification(orderData);
    const customerEmail = buildDirectOrderCustomerConfirmation(orderData);

    // 7. Dispatch Emails simultaneously
    const [salesResponse, customerResponse] = await Promise.all([
      // Send to internal team
      resend.emails.send({
        from: FROM_EMAIL,
        to: SALES_EMAIL,
        subject: salesEmail.subject,
        html: salesEmail.html,
        replyTo: orderData.email,
      }),
      // Send receipt to customer
      resend.emails.send({
        from: FROM_EMAIL,
        to: orderData.email,
        subject: customerEmail.subject,
        html: customerEmail.html,
      })
    ]);

    console.log('[direct-order] Resend sales response:', salesResponse);
    console.log('[direct-order] Resend customer response:', customerResponse);

    // Check for specific Resend SDK Errors
    if (salesResponse.error) {
      console.error('[direct-order] Failed to send Sales Email:', salesResponse.error);
      return res.status(500).json({
        error: 'RESEND_SALES_FAILED',
        message: salesResponse.error.message,
      });
    }

    if (customerResponse.error) {
       console.error('[direct-order] Failed to send Customer Email:', customerResponse.error);
       // We still consider the order received if the internal sales email worked? 
       // Usually yes, but for strictness we inform the user.
       return res.status(500).json({
        error: 'RESEND_CUSTOMER_FAILED',
        message: customerResponse.error.message,
      });
    }

    // 8. Success!
    return res.status(200).json({ success: true, ...totals });

  } catch (err: any) {
    console.error('[direct-order] Full error object:', err);
    return res.status(500).json({ 
      error: 'SERVER_ERROR', 
      message: err instanceof Error ? err.message : 'An unexpected server error occurred.'
    });
  }
}
