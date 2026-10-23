import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Heart } from 'lucide-react';
import './BlessingsForm.css';

/* ── EmailJS configuration ──
   Replace these with your actual values from https://www.emailjs.com/
   SERVICE_ID  → your EmailJS service ID
   TEMPLATE_ID → your EmailJS template ID
   PUBLIC_KEY  → your EmailJS public (user) key
   ─────────────────────────── */
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

const IS_EMAILJS_CONFIGURED =
  EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID' &&
  EMAILJS_TEMPLATE_ID !== 'YOUR_TEMPLATE_ID' &&
  EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY';

function validate(name, message) {
  const errors = {};
  if (!name.trim()) {
    errors.name = 'Please enter your name.';
  } else if (name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }
  if (!message.trim()) {
    errors.message = 'Please write a blessing message.';
  } else if (message.trim().length < 10) {
    errors.message = 'Please share a little more — at least 10 characters.';
  }
  return errors;
}

/* Send via EmailJS REST API — no npm package required */
async function sendViaEmailJS(guestName, blessingMsg) {
  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      user_id: EMAILJS_PUBLIC_KEY,
      template_params: {
        guest_name: guestName.trim(),
        blessing_message: blessingMsg.trim(),
        sent_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      },
    }),
  });
  if (!response.ok) {
    throw new Error(`EmailJS responded with status ${response.status}`);
  }
}

export default function BlessingsForm() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error' | 'not_configured'

  const handleBlur = useCallback(
    (field) => () => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      const errs = validate(
        field === 'name' ? name : name,
        field === 'message' ? message : message
      );
      setErrors(validate(name, message));
    },
    [name, message]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const errs = validate(name, message);
      setErrors(errs);
      setTouched({ name: true, message: true });

      if (Object.keys(errs).length > 0) return;

      if (!IS_EMAILJS_CONFIGURED) {
        setStatus('not_configured');
        return;
      }

      setStatus('sending');

      try {
        await sendViaEmailJS(name, message);
        setStatus('success');
        setName('');
        setMessage('');
        setTouched({});
        setErrors({});
      } catch (err) {
        console.error('EmailJS error:', err);
        setStatus('error');
      }
    },
    [name, message]
  );

  const isSending = status === 'sending';

  return (
    <section
      id="blessings"
      className="blessings-section"
      aria-labelledby="blessings-heading"
    >
      {/* Heading */}
      <motion.div
        className="blessings-heading-group"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <p className="blessings-pre-label">✦ Join Our Celebration ✦</p>
        <h2 id="blessings-heading" className="blessings-heading">
          Send Your Blessings
        </h2>
        <p className="blessings-subtext">
          Your warm wishes mean the world to us
        </p>
      </motion.div>

      {/* Form card */}
      <motion.div
        className="blessings-form-card"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, delay: 0.15, type: 'spring', stiffness: 65 }}
      >
        <form
          className="blessings-form"
          onSubmit={handleSubmit}
          noValidate
          aria-label="Send your blessings form"
        >
          {/* Name field */}
          <div className="form-group">
            <label htmlFor="guest-name" className="form-label">
              Your Name <span className="required-star" aria-hidden="true">*</span>
            </label>
            <input
              id="guest-name"
              type="text"
              className={`form-input${touched.name && errors.name ? ' error' : ''}`}
              placeholder="e.g. Priya Sharma"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (touched.name) setErrors(validate(e.target.value, message));
              }}
              onBlur={handleBlur('name')}
              disabled={isSending}
              aria-required="true"
              aria-describedby={errors.name ? 'name-error' : undefined}
              aria-invalid={touched.name && !!errors.name}
              autoComplete="name"
            />
            <AnimatePresence>
              {touched.name && errors.name && (
                <motion.p
                  id="name-error"
                  className="form-error-msg"
                  role="alert"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <AlertCircle size={12} aria-hidden="true" />
                  {errors.name}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Message field */}
          <div className="form-group">
            <label htmlFor="blessing-message" className="form-label">
              Blessing Message <span className="required-star" aria-hidden="true">*</span>
            </label>
            <textarea
              id="blessing-message"
              className={`form-textarea${touched.message && errors.message ? ' error' : ''}`}
              placeholder="Share your heartfelt blessings for Ram & Sita…"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (touched.message) setErrors(validate(name, e.target.value));
              }}
              onBlur={handleBlur('message')}
              disabled={isSending}
              aria-required="true"
              aria-describedby={errors.message ? 'message-error' : undefined}
              aria-invalid={touched.message && !!errors.message}
            />
            <AnimatePresence>
              {touched.message && errors.message && (
                <motion.p
                  id="message-error"
                  className="form-error-msg"
                  role="alert"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <AlertCircle size={12} aria-hidden="true" />
                  {errors.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* EmailJS setup notice */}
          {!IS_EMAILJS_CONFIGURED && (
            <div className="emailjs-notice" role="note">
              <strong>📧 Email Delivery Setup:</strong> To receive blessings in your inbox, install{' '}
              <code>@emailjs/browser</code> (<code>npm i @emailjs/browser</code>) and replace the{' '}
              <code>SERVICE_ID</code>, <code>TEMPLATE_ID</code>, and <code>PUBLIC_KEY</code> constants
              in <code>BlessingsForm.jsx</code> with your{' '}
              <a href="https://www.emailjs.com/" target="_blank" rel="noopener noreferrer">
                EmailJS credentials
              </a>
              . Your template should accept <code>guest_name</code>, <code>blessing_message</code>, and{' '}
              <code>sent_at</code> variables.
            </div>
          )}

          {/* Status messages */}
          <AnimatePresence mode="wait">
            {status === 'success' && (
              <motion.div
                className="form-status success"
                role="status"
                aria-live="polite"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <CheckCircle size={18} aria-hidden="true" style={{ flexShrink: 0, marginTop: 1 }} />
                <span>
                  Your blessing has been sent! 💕 Ram &amp; Sita are grateful for your warm wishes.
                </span>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                className="form-status error"
                role="alert"
                aria-live="assertive"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <AlertCircle size={18} aria-hidden="true" style={{ flexShrink: 0, marginTop: 1 }} />
                <span>
                  Something went wrong while sending. Please try again or contact us directly.
                </span>
              </motion.div>
            )}

            {status === 'not_configured' && (
              <motion.div
                className="form-status error"
                role="alert"
                aria-live="assertive"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <AlertCircle size={18} aria-hidden="true" style={{ flexShrink: 0, marginTop: 1 }} />
                <span>
                  Email delivery is not yet configured. Please set up EmailJS credentials in{' '}
                  <code style={{ fontSize: '0.7em' }}>BlessingsForm.jsx</code> to send blessings.
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit button */}
          <button
            type="submit"
            className="submit-btn"
            disabled={isSending}
            aria-busy={isSending}
          >
            {isSending ? (
              <>
                <div className="spinner" aria-hidden="true" />
                <span>Sending…</span>
              </>
            ) : (
              <>
                <Heart size={16} aria-hidden="true" />
                <span>Send Blessing</span>
                <Send size={14} aria-hidden="true" />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </section>
  );
}
