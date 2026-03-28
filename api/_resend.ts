import { Resend } from 'resend';

export const getResendClient = () => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY environment variable is not set.');
  }
  return new Resend(process.env.RESEND_API_KEY);
};

export const SALES_EMAIL = 'sales@chilijungle.com';
export const FROM_EMAIL  = 'Chili Jungle <noreply@chilijungle.com>';
