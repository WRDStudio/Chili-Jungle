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
          <img src="https://www.chilijungle.com/images/logo_transparent2.webp" alt="Chili Jungle" style="width:80px;margin-bottom:24px;" />
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
        <img src="https://www.chilijungle.com/images/logo_transparent2.webp" alt="Chili Jungle" style="width:80px;margin-bottom:24px;" />
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

// ─── Direct Sales Order Templates ─────────────────────────────────────────────

export interface DirectOrderData {
  name: string;
  email: string;
  phone: string;
  clasicoQty: number;
  tropicalQty: number;
  totalUnits: number;
  totalUSD: number;
  totalCRC: number;
  province: string;
  canton: string;
  district: string;
  address: string;
  deliveryMethod: string;
  notes?: string;
  source?: string;
  submittedAt?: string;
}

// ─── Internal notification to the sales team for Orders ───────────────────────
export function buildDirectOrderSalesNotification(data: DirectOrderData): {
  subject: string;
  html: string;
} {
  return {
    subject: `🛒 New Direct Order – ${data.name} – ${data.totalUnits} item(s)`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;">
        <h2 style="color:#C7432A;">Nuevo Pedido Directo</h2>
        <h3 style="color:#333;margin-bottom:8px;">1. Cliente</h3>
        <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Nombre</td><td style="padding:8px;">${data.name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Email</td><td style="padding:8px;">${data.email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Teléfono</td><td style="padding:8px;">${data.phone}</td></tr>
        </table>

        <h3 style="color:#333;margin-bottom:8px;">2. Pedido & Precio (Server-calculated)</h3>
        <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Clásico</td><td style="padding:8px;">${data.clasicoQty} u.</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Tropical</td><td style="padding:8px;">${data.tropicalQty} u.</td></tr>
          <tr style="border-top:2px solid #ddd;"><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Total de Botellas</td><td style="padding:8px;"><strong>${data.totalUnits} u.</strong></td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Total a Cobrar</td><td style="padding:8px;"><strong style="color:#C7432A;">$${data.totalUSD} USD / ₡${data.totalCRC} CRC</strong></td></tr>
        </table>

        <h3 style="color:#333;margin-bottom:8px;">3. Logística</h3>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Método de Entrega</td><td style="padding:8px;">${data.deliveryMethod}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Provincia</td><td style="padding:8px;">${data.province}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Cantón</td><td style="padding:8px;">${data.canton}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Distrito</td><td style="padding:8px;">${data.district}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Dirección Exacta</td><td style="padding:8px;">${data.address}</td></tr>
          ${data.notes ? `<tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Notas del Cliente</td><td style="padding:8px;"><i>${data.notes}</i></td></tr>` : ''}
        </table>
        
        <h3 style="color:#333;margin-bottom:8px;">4. Tracking</h3>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Origen / Source</td><td style="padding:8px;">${data.source || 'direct'}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f5f5f5;">Enviado el</td><td style="padding:8px;">${data.submittedAt || new Date().toISOString()}</td></tr>
        </table>
        
        <p style="color:#888;font-size:12px;margin-top:24px;">Enviado desde el formulario de pedido chilijungle.com</p>
      </div>
    `,
  };
}

// ─── Customer confirmation receipt ──────────────────────────────────────────────
export function buildDirectOrderCustomerConfirmation(data: DirectOrderData): {
  subject: string;
  html: string;
} {
  const firstName = data.name.trim().split(' ')[0];
  return {
    subject: `Tu pedido de Chili Jungle fue recibido`,
    html: `
      <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;max-width:600px;margin:auto;background:#0A0A0A;color:#F3E5AB;padding:48px 40px;border-radius:20px;">

        <p style="font-size:26px;font-weight:700;letter-spacing:-0.5px;margin:0 0 24px;">🔥 Hola ${firstName},<br/>tu pedido ha sido recibido.</p>

        <p style="font-size:15px;line-height:1.7;color:#E5C97E;margin:0 0 12px;">
          Nuestro equipo revisará tu orden y te contactará en las próximas <strong style="color:#F3E5AB;">24&ndash;48 horas</strong> para coordinar entrega y método de pago.
        </p>

        <p style="font-size:15px;line-height:1.7;color:#E5C97E;margin:0 0 32px;">
          Gracias por confiar en Chili Jungle.
        </p>

        <div style="background:#141414;border:1px solid #2a2a2a;border-radius:12px;padding:24px;margin-bottom:32px;">
          <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#888;margin:0 0 16px;font-weight:700;">Tu Pedido</p>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0;font-size:14px;color:#aaa;">Cl&aacute;sico</td>
              <td style="padding:8px 0;font-size:14px;color:#F3E5AB;text-align:right;font-weight:600;">${data.clasicoQty} u.</td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-size:14px;color:#aaa;">Tropical</td>
              <td style="padding:8px 0;font-size:14px;color:#F3E5AB;text-align:right;font-weight:600;">${data.tropicalQty} u.</td>
            </tr>
            <tr style="border-top:1px solid #2a2a2a;">
              <td style="padding:12px 0 4px;font-size:15px;color:#F3E5AB;font-weight:700;">Total</td>
              <td style="padding:12px 0 4px;font-size:18px;color:#E5812A;text-align:right;font-weight:700;">&#x20A1;${data.totalCRC.toLocaleString()} <span style="font-size:13px;color:#888;">($${data.totalUSD})</span></td>
            </tr>
          </table>
        </div>

        <hr style="border:none;border-top:1px solid #222;margin:0 0 28px;" />

        <p style="font-size:14px;color:#F3E5AB;font-weight:700;letter-spacing:0.05em;margin:0 0 6px;">&mdash; Spice from Paradise Team</p>
        <p style="margin:0;"><em style="font-size:12px;color:#555;">From spicy lovers for spicy lovers</em></p>

      </div>
    `,
  };
}
