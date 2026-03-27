// Email templates for B2B contact form
// Kept in a separate file so the API route stays clean and templates can be
// updated or internationalised independently.

export interface B2BFormData {
  name: string;
  email: string;
  country: string;
  businessType: string;
  message: string;
  lang?: 'es' | 'en';
}

// ─── Internal notification to the sales team ─────────────────────────────────
export function buildSalesNotificationEmail(data: B2BFormData): {
  subject: string;
  html: string;
} {
  return {
    subject: `[B2B Lead] ${data.name} — ${data.businessType} (${data.country})`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;">
        <h2 style="color:#C7432A;">Nueva Consulta B2B / New B2B Inquiry</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Nombre / Name</td><td style="padding:8px;">${data.name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Email</td><td style="padding:8px;">${data.email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">País / Country</td><td style="padding:8px;">${data.country}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Tipo de Negocio</td><td style="padding:8px;">${data.businessType}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Mensaje / Message</td><td style="padding:8px;">${data.message}</td></tr>
        </table>
        <p style="color:#888;font-size:12px;margin-top:24px;">Enviado desde chilijungle.com</p>
      </div>
    `,
  };
}

// ─── Bilingual auto-reply to the person who submitted the form ────────────────
export function buildAutoReplyEmail(data: B2BFormData): {
  subject: string;
  html: string;
} {
  const isSpanish = data.lang !== 'en';

  if (isSpanish) {
    return {
      subject: '¡Gracias por contactar a Chili Jungle! 🌶️',
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;background:#0A0A0A;color:#F3E5AB;padding:40px;border-radius:16px;">
          <img src="https://www.chilijungle.com/images/logo_transparent2.png" alt="Chili Jungle" style="width:80px;margin-bottom:24px;" />
          <h2 style="color:#E5812A;">Hola, ${data.name} 👋</h2>
          <p>Gracias por tu interés en distribuir Chili Jungle. Hemos recibido tu mensaje y nuestro equipo de ventas te contactará en las próximas <strong>24–48 horas</strong>.</p>
          <p>Mientras tanto, visita nuestra web y vive el ritual 🌿🔥</p>
          <a href="https://www.chilijungle.com" style="display:inline-block;margin-top:16px;padding:12px 24px;background:#C7432A;color:white;border-radius:8px;text-decoration:none;font-weight:bold;">Ver el Sitio</a>
          <hr style="border:none;border-top:1px solid #333;margin:32px 0;" />
          <p style="font-size:12px;color:#888;">Chili Jungle · Tamarindo, Costa Rica · <a href="https://www.chilijungle.com" style="color:#888;">chilijungle.com</a></p>
        </div>
      `,
    };
  }

  return {
    subject: 'Thanks for reaching out to Chili Jungle! 🌶️',
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;background:#0A0A0A;color:#F3E5AB;padding:40px;border-radius:16px;">
        <img src="https://www.chilijungle.com/images/logo_transparent2.png" alt="Chili Jungle" style="width:80px;margin-bottom:24px;" />
        <h2 style="color:#E5812A;">Hey, ${data.name} 👋</h2>
        <p>Thank you for your interest in distributing Chili Jungle. We've received your inquiry and our sales team will get back to you within <strong>24–48 hours</strong>.</p>
        <p>In the meantime, explore the experience 🌿🔥</p>
        <a href="https://www.chilijungle.com" style="display:inline-block;margin-top:16px;padding:12px 24px;background:#C7432A;color:white;border-radius:8px;text-decoration:none;font-weight:bold;">Visit Our Site</a>
        <hr style="border:none;border-top:1px solid #333;margin:32px 0;" />
        <p style="font-size:12px;color:#888;">Chili Jungle · Tamarindo, Costa Rica · <a href="https://www.chilijungle.com" style="color:#888;">chilijungle.com</a></p>
      </div>
    `,
  };
}
