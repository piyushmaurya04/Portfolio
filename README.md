# Piyush Maurya Portfolio

The portfolio is a Vite and React application with TypeScript, Three.js, GSAP, and responsive scene-based sections.

## Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

The deployed site uses the Netlify configuration in `netlify.toml`. The contact form sends through the Netlify Function at `/.netlify/functions/contact`.

Configure these environment variables in Netlify (or in a local `.env` for Netlify CLI development): `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, and `CONTACT_RECIPIENT`. Keep `SMTP_PASSWORD` out of source control.
