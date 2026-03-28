import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getResendClient, SALES_EMAIL, FROM_EMAIL } from './_resend.js';
import {
  buildSalesNotificationEmail,
  buildAutoReplyEmail,
  type B2BFormData,
} from './_emailTemplates.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Handle CORS pre-flight
    if (req.method === 'OPTIONS') {
      return res.status(200).json({ success: true, message: 'CORS OK' });
    }

    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    console.log('[contact-b2b] Incoming request body:', req.body);

    const body = req.body || {};
    const { name, email, country, businessType, message, lang } = body as B2BFormData;

    // Basic server-side validation
    if (!name || !email || !country || !businessType || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }

    const formData: B2BFormData = { name, email, country, businessType, message, lang };

    // Initialize resend client here inside the try/catch
    const resend = getResendClient();

    // 1. Notify the sales team
    const notification = buildSalesNotificationEmail(formData);
    const { data: salesData, error: salesError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: SALES_EMAIL,
      replyTo: email,
      subject: notification.subject,
      html: notification.html,
    });

    console.log('[contact-b2b] Resend notification response:', { data: salesData, error: salesError });

    if (salesError) {
      return res.status(500).json({
        error: "RESEND_FAILED",
        message: salesError.message
      });
    }

    // 2. Send bilingual auto-reply to the submitter
    const autoReply = buildAutoReplyEmail(formData);
    const { data: replyData, error: replyError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: autoReply.subject,
      html: autoReply.html,
    });

    console.log('[contact-b2b] Resend auto-reply response:', { data: replyData, error: replyError });

    if (replyError) {
      return res.status(500).json({
        error: "RESEND_FAILED",
        message: replyError.message
      });
    }

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error('[contact-b2b] Full error object:', err);
    return res.status(500).json({ 
      error: 'SERVER_ERROR', 
      message: err instanceof Error ? err.message : 'An unexpected server error occurred.'
    });
  }
}
