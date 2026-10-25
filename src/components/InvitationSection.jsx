import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.18, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { delay: i * 0.18, duration: 1.2 },
  }),
};

const GOLD = '#E8C88A';
const GOLD_SOFT = '#FFE9C2';

function Lotus({ className = '', style }) {
  return (
    <svg viewBox="0 0 48 48" className={className} style={style} fill="none" aria-hidden="true">
      <path d="M24 6c4 6 6 11 6 16s-3 9-6 12c-3-3-6-7-6-12s2-10 6-16z" fill="currentColor" opacity="0.95" />
      <path d="M10 16c6 1 11 4 13 9 1 3 0 7-2 10-5-1-9-4-11-9-1-3-1-7 0-10z" fill="currentColor" opacity="0.7" />
      <path d="M38 16c-6 1-11 4-13 9-1 3 0 7 2 10 5-1 9-4 11-9 1-3 1-7 0-10z" fill="currentColor" opacity="0.7" />
      <path d="M6 28c5 0 9 2 12 6 1 2 2 4 2 6-5 0-9-2-12-6-1-2-2-4-2-6z" fill="currentColor" opacity="0.45" />
      <path d="M42 28c-5 0-9 2-12 6-1 2-2 4-2 6 5 0 9-2 12-6 1-2 2-4 2-6z" fill="currentColor" opacity="0.45" />
    </svg>
  );
}

export default function InvitationSection() {
  return (
    <section
      id="invitation"
      aria-labelledby="invitation-heading"
      className="relative min-h-[100dvh] w-full overflow-hidden flex flex-col items-center justify-center px-5 sm:px-8 py-16 sm:py-20 scroll-mt-0 bg-[radial-gradient(ellipse_at_50%_30%,#6b1a30_0%,#3d0d1c_45%,#1a050c_100%)]"
    >
      {/* Soft gold glow behind content */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(900px,130vw)] h-[min(900px,130vw)] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(232,200,138,0.14)_0%,transparent_65%)]"
        aria-hidden="true"
      />

      {/* Faint rotating mandala lines */}
      <motion.svg
        viewBox="0 0 400 400"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(900px,140vw)] h-[min(900px,140vw)] pointer-events-none opacity-[0.07]"
        animate={{ rotate: 360 }}
        transition={{ duration: 180, repeat: Infinity, ease: 'linear' }}
        fill="none"
        stroke={GOLD}
        strokeWidth="0.6"
        aria-hidden="true"
      >
        <circle cx="200" cy="200" r="190" />
        <circle cx="200" cy="200" r="150" />
        <circle cx="200" cy="200" r="110" />
        <circle cx="200" cy="200" r="70" />
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={i} x1="200" y1="10" x2="200" y2="390" transform={`rotate(${i * 15} 200 200)`} />
        ))}
      </motion.svg>

      {/* Vignette (wine) */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(53,11,24,0.55)_100%)]"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl">
        {/* Ganesh logo */}
        <motion.img
          src="/logo/LordGanesha.png"
          alt="Lord Ganesha"
          className="w-18 sm:w-20 md:w-24 h-auto object-contain mb-5 sm:mb-6 drop-shadow-[0_0_18px_rgba(232,200,138,0.35)]"
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        />

        {/* Top line */}
        <motion.div
          className="w-40 sm:w-56 h-px bg-gradient-to-r from-transparent via-[#E8C88A]/60 to-transparent mb-5"
          custom={1}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          aria-hidden="true"
        />

        {/* Label */}
        <motion.p
          className="font-sans text-[0.65rem] sm:text-xs md:text-sm font-semibold tracking-[0.35em] uppercase mb-4 sm:mb-6"
          style={{ color: GOLD }}
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          Engagement Celebration of
        </motion.p>

        {/* Names */}
{/* Couple Names Animation */}
<motion.h1
  id="invitation-heading"
  className="font-script mt-2 leading-[1.05] flex flex-row flex-nowrap items-center justify-center gap-4 sm:gap-3 md:gap-5 text-[clamp(4rem,12vw,10rem)] whitespace-nowrap [text-shadow:0_4px_30px_rgba(232,200,138,0.25)]"
  style={{ color: GOLD_SOFT }}
  initial="hidden"
  animate="visible"
>
  {/* Kunal enters from the left */}
  <motion.span
    initial={{ opacity: 0, x: -150 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
  >
    Kunal
  </motion.span>

  {/* Ampersand in the center */}
  <motion.span
    className="text-[0.5em] shrink-0"
    style={{ color: GOLD }}
    initial={{ opacity: 0, scale: 0.3, rotate: -90 }}
    animate={{ opacity: 1, scale: 1, rotate: 0 }}
    transition={{ duration: 0.7, ease: "backOut", delay: 0.9 }}
  >
    &amp;
  </motion.span>

  {/* Stuti enters from the right */}
  <motion.span
    initial={{ opacity: 0, x: 150 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
  >
    Stuti
  </motion.span>
</motion.h1>

        {/* Divider */}
        <motion.div
          className="w-[min(480px,85%)] h-px bg-gradient-to-r from-transparent via-[#E8C88A]/50 to-transparent my-6 sm:my-8"
          custom={3}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          aria-hidden="true"
        />

         {/* Tagline */}
        <motion.p
          className="font-serif italic mt-6 sm:mt-8 max-w-[34ch] sm:max-w-[44ch] text-[clamp(1.05rem,3.6vw,1.6rem)] leading-[1.6]"
          style={{ color: GOLD_SOFT }}
          custom={6}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          Together with our families, we joyfully invite you to celebrate our special day.
        </motion.p>

        {/* Lotus divider */}
        <motion.div
          className="flex items-center justify-center gap-4 w-full max-w-[560px] mt-8 sm:mt-10"
          custom={7}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          aria-hidden="true"
        >
          <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[#E8C88A]/70" />
          <Lotus className="w-7 h-7 sm:w-9 sm:h-9" style={{ color: GOLD }} />
          <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[#E8C88A]/70" />
        </motion.div>
      </div>
    </section>
  );
}