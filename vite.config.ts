import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

function netlifyContactDevPlugin(): Plugin {
  return {
    name: 'netlify-contact-dev',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/.netlify/functions/contact', async (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              const { name, email, message } = JSON.parse(body || '{}');
              const apiKey = process.env.RESEND_API_KEY;
              const recipient = process.env.CONTACT_RECIPIENT;
              const fromEmail = process.env.RESEND_FROM || 'Portfolio Contact <onboarding@resend.dev>';

              if (!apiKey || !recipient) {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 500;
                res.end(
                  JSON.stringify({
                    error: 'Missing RESEND_API_KEY or CONTACT_RECIPIENT in environment.',
                  }),
                );
                return;
              }

              const response = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${apiKey}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  from: fromEmail,
                  to: [recipient],
                  reply_to: email,
                  subject: 'Portfolio Contact Inquiry',
                  text: `New message from ${name} (${email}):\n\n${message}`,
                  html: `
                    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #111;">
                      <h2 style="margin-top: 0; color: #0b1120;">Portfolio Contact Inquiry</h2>
                      <p><strong>Name:</strong> ${name}</p>
                      <p><strong>Email:</strong> ${email}</p>
                      <p><strong>Message:</strong></p>
                      <p style="white-space: pre-wrap; background: #f8fafc; padding: 12px; border-radius: 6px;">${message}</p>
                    </div>
                  `,
                }),
              });
              const data = await response.json();
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = response.status;
              res.end(JSON.stringify(data));
            } catch (err: unknown) {
              const message = err instanceof Error ? err.message : 'Failed to send email.';
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 500;
              res.end(JSON.stringify({ error: message }));
            }
          });
        } else {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), netlifyContactDevPlugin()],
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          r3f: ['@react-three/fiber', '@react-three/drei'],
          post: ['@react-three/postprocessing', 'postprocessing'],
          gsap: ['gsap'],
        },
      },
    },
  },
  assetsInclude: ['**/*.glb', '**/*.hdr'],
});
