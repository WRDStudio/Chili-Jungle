import type { VercelRequest, VercelResponse } from '@vercel/node';
import { resend, SALES_EMAIL, FROM_EMAIL } from './_resend';
import {
  buildSalesNotificationEmail,
  buildAutoReplyEmail,
  type B2BFormData,
} from './_emailTemplates';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS pre-flight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, country, businessType, message, lang } =
    req.body as B2BFormData;

  // Basic server-side validation
  if (!name || !email || !country || !businessType || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  const formData: B2BFormData = { name, email, country, businessType, message, lang };

  try {
    // 1. Notify the sales team
    const notification = buildSalesNotificationEmail(formData);
    await resend.emails.send({
      from: FROM_EMAIL,
      to: SALES_EMAIL,
      replyTo: email,
      subject: notification.subject,
      html: notification.html,
    });

    // 2. Send bilingual auto-reply to the submitter
    const autoReply = buildAutoReplyEmail(formData);
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: autoReply.subject,
      html: autoReply.html,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('[contact-b2b] Resend error:', err);
    return res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
}
