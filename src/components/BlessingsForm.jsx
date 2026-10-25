import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, CheckCircle2, AlertCircle } from 'lucide-react';

const TO_EMAIL = 'stutikeshari2@gmail.com';
const MAX_MSG = 2000;

const WINE = '#651b2b';
const GOLD = '#D6A85F';
const GOLD_DARK = '#a17b43';

const HINTS = [
  'Congratulations! 🎉',
  'Congrats to you both! 💐',
  'Yes, we are coming! 🥳',
  'God bless you both 🙏',
  'Wishing you a lifetime of happiness ❤️',
  'Can\'t wait to celebrate with you! 🎊',
];

const fieldClass =
  'w-full rounded-xl border bg-white/70 px-4 py-3.5 text-base text-[#4b2430] placeholder:text-[#795d55]/50 outline-none transition-all duration-300 border-[#dfcba9] focus:border-[#D6A85F] focus:bg-white focus:shadow-[0_0_0_4px_rgba(214,168,95,0.18)] disabled:opacity-60';

export default function BlessingsForm() {
  const [guestName, setGuestName] = useState('');
  const [blessing, setBlessing] = useState('');
  const [status, setStatus] = useState({ type: '', text: '' });
  const [isSending, setIsSending] = useState(false);

  const addHint = (text) => {
    setBlessing((prev) => {
      const next = prev.trim() ? `${prev.trim()} ${text}` : text;
      return next.slice(0, MAX_MSG);
    });
    setStatus({ type: '', text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!guestName.trim() || !blessing.trim()) {
      setStatus({ type: 'error', text: 'Please enter your name and blessing.' });
      return;
    }

    setIsSending(true);
    setStatus({ type: '', text: '' });

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${TO_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: guestName.trim(),
          message: blessing.trim(),
          _subject: 'A New Blessing for Kunal & Stuti 💌',
          _template: 'table',
        }),
      });

      const result = await response.json();

      if (!response.ok || result.success === 'false') {
        throw new Error('Unable to send your blessing.');
      }

      setStatus({
        type: 'success',
        text: 'Thank you! Your blessing has been submitted. ❤️',
      });
      setGuestName('');
      setBlessing('');
    } catch (error) {
      setStatus({
        type: 'error',
        text: 'Sorry, your blessing could not be sent. Please try again.',
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      id="blessings"
      aria-labelledby="blessings-heading"
      className="relative w-full overflow-hidden px-4 sm:px-8 py-14 sm:py-20 bg-[linear-gradient(160deg,#FFF7EF_0%,#FAF1E0_50%,#F8E6E2_100%)]"
    >
      {/* Soft glows */}
      <div
        className="absolute -top-[15%] -right-[15%] w-[min(450px,80vw)] h-[min(450px,80vw)] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(214,168,95,0.18)_0%,transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-[15%] -left-[15%] w-[min(400px,75vw)] h-[min(400px,75vw)] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(101,27,43,0.09)_0%,transparent_70%)]"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mx-auto w-full max-w-xl"
      >
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div
            className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full shadow-[0_10px_30px_rgba(101,27,43,0.3)] bg-[linear-gradient(135deg,#651b2b_0%,#3d0d1c_100%)]"
            aria-hidden="true"
          >
            <Heart size={22} fill="#E8C88A" color="#E8C88A" />
          </div>

          <p
            className="mb-2 font-sans text-[0.65rem] sm:text-xs font-semibold uppercase tracking-[0.35em]"
            style={{ color: GOLD_DARK }}
          >
            With love and blessings
          </p>

          <h2
            id="blessings-heading"
            className="font-serif text-[clamp(2rem,7vw,3rem)] font-bold leading-tight"
            style={{ color: WINE }}
          >
            Send Your Blessings
          </h2>

          <div className="mt-3 flex items-center justify-center gap-3" aria-hidden="true">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#D6A85F]" />
            <span className="text-xs" style={{ color: GOLD }}>✦</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#D6A85F]" />
          </div>

          <p className="mx-auto mt-4 max-w-sm text-sm sm:text-base leading-relaxed text-[#795d55]">
            Share your love and heartfelt wishes for Kunal &amp; Stuti.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="relative rounded-3xl border p-5 sm:p-8 backdrop-blur-sm bg-white/60 shadow-[0_20px_60px_rgba(101,27,43,0.12)]"
          style={{ borderColor: 'rgba(214,168,95,0.45)' }}
        >
          {/* Gold top accent */}
          <div
            className="absolute -top-px left-1/2 h-[3px] w-24 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-[#D6A85F] to-transparent"
            aria-hidden="true"
          />

          <div className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="guestName"
                className="mb-2 block font-sans text-[0.7rem] sm:text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: WINE }}
              >
                Your Name
              </label>
              <input
                id="guestName"
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Your name here..."
                maxLength={100}
                required
                disabled={isSending}
                autoComplete="name"
                className={fieldClass}
              />
            </div>

            {/* Quick hints */}
            <div>
              <p
                className="mb-2.5 font-sans text-[0.7rem] sm:text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: GOLD_DARK }}
              >
                ✦ Quick wishes (tap to add)
              </p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Quick blessing suggestions">
                {HINTS.map((hint) => (
                  <motion.button
                    key={hint}
                    type="button"
                    onClick={() => addHint(hint)}
                    disabled={isSending}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-full border px-3.5 py-1.5 text-left font-serif text-[0.8rem] sm:text-sm leading-snug cursor-pointer bg-white/70 hover:bg-[#FFF3DC] hover:border-[#D6A85F] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6A85F]"
                    style={{ color: WINE, borderColor: 'rgba(214,168,95,0.55)' }}
                  >
                    {hint}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Blessing */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="blessing"
                  className="font-sans text-[0.7rem] sm:text-xs font-semibold uppercase tracking-[0.2em]"
                  style={{ color: WINE }}
                >
                  Your Blessing
                </label>
                <span className="font-sans text-[0.65rem] text-[#795d55]/70" aria-hidden="true">
                  {blessing.length}/{MAX_MSG}
                </span>
              </div>
              <textarea
                id="blessing"
                value={blessing}
                onChange={(e) => setBlessing(e.target.value)}
                placeholder="Write your wishes for the couple..."
                rows={5}
                maxLength={MAX_MSG}
                required
                disabled={isSending}
                className={`${fieldClass} resize-none leading-relaxed min-h-[130px]`}
              />
            </div>

            {/* Status */}
            <AnimatePresence mode="wait">
              {status.text && (
                <motion.div
                  key={status.type}
                  role="status"
                  aria-live="polite"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-start gap-2.5 rounded-xl border p-3.5 text-sm leading-relaxed ${
                    status.type === 'success'
                      ? 'border-emerald-300/60 bg-emerald-50 text-emerald-800'
                      : 'border-rose-300/60 bg-rose-50 text-rose-800'
                  }`}
                >
                  {status.type === 'success' ? (
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                  ) : (
                    <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                  )}
                  <span>{status.text}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isSending}
              whileHover={isSending ? undefined : { scale: 1.02, y: -2 }}
              whileTap={isSending ? undefined : { scale: 0.98 }}
              className="flex w-full items-center justify-center gap-2.5 rounded-full border px-6 py-3.5 font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.2em] cursor-pointer bg-[linear-gradient(135deg,#651b2b_0%,#3d0d1c_100%)] shadow-[0_10px_30px_rgba(101,27,43,0.35)] hover:shadow-[0_14px_40px_rgba(101,27,43,0.45)] transition-shadow duration-300 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D6A85F]"
              style={{ color: '#FFE9C2', borderColor: 'rgba(214,168,95,0.5)' }}
            >
              {isSending ? (
                <>
                  <span
                    className="h-[18px] w-[18px] shrink-0 animate-spin rounded-full border-2 border-[#FFE9C2]/30 border-t-[#FFE9C2]"
                    aria-hidden="true"
                  />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Heart size={15} aria-hidden="true" />
                  <span>Send Blessing</span>
                  <Send size={14} aria-hidden="true" />
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </section>
  );
}