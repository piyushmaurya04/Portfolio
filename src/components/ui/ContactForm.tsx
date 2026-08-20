import { useRef, useState } from 'react';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [note, setNote] = useState('');
  const honeypot = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    const next: Errors = {};
    if (!name) next.name = 'Please enter your name.';
    if (!email) next.email = 'Please enter your email.';
    else if (!EMAIL_RE.test(email)) next.email = 'Enter a valid email address.';
    if (!message) next.message = 'Please write a message.';
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    if (honeypot.current?.value) return; // bot trap

    if (!ENDPOINT) {
      window.location.href = `mailto:piyushmaurya0410@gmail.com?subject=${encodeURIComponent(
        `Portfolio message from ${name}`,
      )}&body=${encodeURIComponent(message + '\n\n' + email)}`;
      return;
    }

    setStatus('sending');
    setNote('This may take a few seconds…');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);
    try {
      const payload = new FormData();
      payload.append('Name', name);
      payload.append('Email', email);
      payload.append('Messages', message);
      await fetch(ENDPOINT, {
        method: 'POST',
        body: payload,
        mode: 'no-cors',
        keepalive: true,
        signal: controller.signal,
      });
      setStatus('sent');
      setNote('Message sent successfully ✓');
      form.reset();
      setTimeout(() => {
        setNote('');
        setStatus('idle');
      }, 3000);
    } catch (err) {
      setStatus('error');
      setNote(
        err instanceof DOMException && err.name === 'AbortError'
          ? 'Request timeout. Server may be slow. Try again in a moment.'
          : 'Failed to send message. Please check your connection.',
      );
    } finally {
      clearTimeout(timeout);
    }
  };

  const field =
    'w-full border-b border-bone/35 bg-transparent py-3 text-sm text-bone placeholder:text-bone/55 focus:border-gilt focus:outline-none';

  return (
    <form onSubmit={onSubmit} noValidate className="w-full max-w-md">
      <input
        ref={honeypot}
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="space-y-6">
        <div>
          <input name="name" placeholder="Name" className={field} aria-label="Name" />
          {errors.name && <p className="mt-1 text-[0.7rem] text-gilt">{errors.name}</p>}
        </div>
        <div>
          <input name="email" type="email" placeholder="Email" className={field} aria-label="Email" />
          {errors.email && <p className="mt-1 text-[0.7rem] text-gilt">{errors.email}</p>}
        </div>
        <div>
          <textarea name="message" placeholder="Message" rows={3} className={`${field} resize-none`} aria-label="Message" />
          {errors.message && <p className="mt-1 text-[0.7rem] text-gilt">{errors.message}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-8 rounded-full border border-bone/40 px-6 py-3 text-[0.72rem] uppercase tracking-[0.2em] text-bone transition-colors duration-300 hover:border-gilt hover:text-gilt disabled:opacity-50"
      >
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>

      {note && (
        <p aria-live="polite" className="mt-4 text-[0.72rem] text-bone/75">
          {note}
        </p>
      )}
    </form>
  );
}
