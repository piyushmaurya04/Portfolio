import nodemailer from 'nodemailer';

const SUBJECT = 'Portfolio Contact';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (statusCode, body) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

export default async (request) => {
  if (request.method !== 'POST') return json(405, { error: 'Method not allowed.' });

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

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_RECIPIENT,
      replyTo: email,
      subject: SUBJECT,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });
    return json(200, { ok: true });
  } catch (error) {
    console.error('Contact email failed', error);
    return json(500, { error: 'Unable to send message right now.' });
  }
};