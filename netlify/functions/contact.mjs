const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RECIPIENT = process.env.CONTACT_RECIPIENT;
const FROM_EMAIL = process.env.RESEND_FROM || 'Portfolio Contact <onboarding@resend.dev>';
const SUBJECT = 'Portfolio Contact Inquiry';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const json = (statusCode, body) =>
  new Response(JSON.stringify(body), {
    status: statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
    },
  });

export default async (request) => {
  if (request.method === 'OPTIONS') {
    return json(200, { ok: true });
  }

  if (request.method !== 'POST') {
    return json(405, { error: 'Method not allowed.' });
  }

  if (!RESEND_API_KEY || !RECIPIENT) {
    console.error('Server configuration error: Missing RESEND_API_KEY or CONTACT_RECIPIENT.');
    return json(500, { error: 'Contact service is not configured. Please try again later.' });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json(400, { error: 'Invalid request body.' });
  }

  const name = String(payload?.name ?? '').trim();
  const email = String(payload?.email ?? '').trim();
  const message = String(payload?.message ?? '').trim();

  if (!name || !email || !message || !EMAIL_RE.test(email)) {
    return json(400, { error: 'Please provide a name, valid email, and message.' });
  }
  if (name.length > 120 || email.length > 254 || message.length > 5000) {
    return json(400, { error: 'One or more fields are too long.' });
  }

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [RECIPIENT],
        reply_to: email,
        subject: SUBJECT,
        text: `New message from ${name} (${email}):\n\n${message}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #111; line-height: 1.6;">
            <h2 style="margin-top: 0; color: #0b1120; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px;">Portfolio Contact Inquiry</h2>
            <p style="margin: 16px 0;"><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p style="margin: 16px 0;"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}" style="color: #2563eb;">${escapeHtml(email)}</a></p>
            <div style="margin-top: 20px; padding: 16px; background-color: #f8fafc; border-radius: 8px; border-left: 4px solid #c9a86a;">
              <p style="margin: 0; font-weight: 600; color: #475569; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
              <p style="margin-top: 8px; white-space: pre-wrap; color: #1e293b; line-height: 1.6;">${escapeHtml(message)}</p>
            </div>
            <p style="margin-top: 28px; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 14px;">
              Sent via Portfolio Contact Form
            </p>
          </div>
        `,
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json().catch(() => ({}));
      console.error('Resend API error:', errorData);
      return json(resendResponse.status, {
        error: errorData.message || 'Failed to send message via email provider.',
      });
    }

    const data = await resendResponse.json();
    return json(200, { ok: true, id: data.id });
  } catch (error) {
    console.error('Contact email failed:', error);
    return json(500, { error: 'Unable to send message right now.' });
  }
};
