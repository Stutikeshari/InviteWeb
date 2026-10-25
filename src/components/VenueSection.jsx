import { motion } from 'framer-motion';
import { MapPin, ExternalLink, Calendar, Sparkles } from 'lucide-react';

const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Guru+Kripa+Marriage+Hall+Dhundhi+Katra+Mirzapur';

const WINE = '#641B2D';
const GOLD = '#D6A85F';
const GOLD_DARK = '#B8893C';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function VenueSection() {
  return (
    <section
      id="venue"
      aria-labelledby="venue-heading"
      className="relative w-full overflow-hidden scroll-mt-0 px-2 sm:px-8 py-16 sm:py-24 md:py-28 bg-[linear-gradient(180deg,#FFF7EF_0%,#FAF1E0_50%,#F8E6E2_100%)]"
    >
      {/* Soft background glows */}
      <div
        className="absolute -top-[12%] left-1/2 -translate-x-1/2 w-[min(700px,120vw)] h-[min(700px,120vw)] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(214,168,95,0.16)_0%,transparent_65%)]"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-[15%] -right-[15%] w-[min(450px,80vw)] h-[min(450px,80vw)] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(100,27,45,0.08)_0%,transparent_70%)]"
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-3xl flex flex-col items-center text-center"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        {/* Label */}
        <motion.p
          variants={item}
          className="inline-flex items-center gap-2 font-sans text-[0.62rem] sm:text-xs font-semibold tracking-[0.32em] sm:tracking-[0.4em] uppercase mb-6 sm:mb-8"
          style={{ color: GOLD_DARK }}
        >
          <Sparkles size={12} aria-hidden="true" />
          Venue Details
          <Sparkles size={12} aria-hidden="true" />
        </motion.p>

        {/* Pin icon with pulse rings */}
        <motion.div
          variants={item}
          className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 mb-6 sm:mb-8"
          aria-hidden="true"
        >
          <span
            className="absolute inset-0 rounded-full animate-ping opacity-20"
            style={{ backgroundColor: GOLD, animationDuration: '2.8s' }}
          />
          <span
            className="absolute inset-2 rounded-full border"
            style={{ borderColor: 'rgba(214,168,95,0.55)' }}
          />
          <span className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[linear-gradient(135deg,#641B2D_0%,#3d0d1c_100%)] shadow-[0_10px_30px_rgba(100,27,45,0.35)]">
            <MapPin size={26} strokeWidth={1.6} color="#E8C88A" />
          </span>
        </motion.div>

        {/* Venue name */}
        <motion.h2
          id="venue-heading"
          variants={item}
          className="font-serif font-semibold leading-[1.1] tracking-[0.01em] text-[clamp(2rem,8vw,3.6rem)]"
          style={{ color: WINE }}
        >
          Guru Kripa Marriage Hall
          {/* <span className="block">Marriage Hall</span> */}
        </motion.h2>

        {/* Location */}
        <motion.p
          variants={item}
          className="mt-3 sm:mt-4 font-sans font-semibold text-[0.9rem] sm:text-lg tracking-[0.2em] sm:tracking-[0.25em] uppercase opacity-70"
          style={{ color: WINE }}
        >
          Dhundhi Katra, Mirzapur
        </motion.p>

        {/* Gold divider */}
        <motion.div
          variants={item}
          className="flex items-center justify-center gap-3 w-full max-w-[280px] my-7 sm:my-9"
          aria-hidden="true"
        >
          <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[#D6A85F]" />
          <span className="text-xs" style={{ color: GOLD }}>✦</span>
          <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[#D6A85F]" />
        </motion.div>

        {/* Date info */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 w-full"
          aria-label="Event date: Sunday, 22 November 2026"
        >
          <div className="flex items-center gap-3">
            <span
              className="flex items-center justify-center w-10 h-10 rounded-full border shrink-0"
              style={{ borderColor: 'rgba(214,168,95,0.6)', color: WINE }}
              aria-hidden="true"
            >
              <Calendar size={17} strokeWidth={1.6} />
            </span>
            <div className="text-left font-semibold">
              <p className="font-sans text-[0.6rem] tracking-[0.3em] uppercase" style={{ color: GOLD_DARK }}>
                Date
              </p>
              <p className="font-serif text-lg sm:text-xl leading-tight" style={{ color: WINE }}>
                22 November 2026
              </p>
            </div>
          </div>

          <span
            className="hidden sm:block w-px h-10 bg-[#D6A85F]/50"
            aria-hidden="true"
          />
          <span
            className="sm:hidden h-px w-16 bg-[#D6A85F]/50"
            aria-hidden="true"
          />

          <div className="flex items-center gap-3">
            <span
              className="flex items-center justify-center w-10 h-10 rounded-full border shrink-0 text-base"
              style={{ borderColor: 'rgba(214,168,95,0.6)', color: WINE }}
              aria-hidden="true"
            >
              ❀
            </span>
            <div className="text-left font-semibold">
              <p className="font-sans text-[0.6rem] tracking-[0.3em] uppercase" style={{ color: GOLD_DARK }}>
                Day
              </p>
              <p className="font-serif italic text-lg sm:text-xl leading-tight" style={{ color: WINE }}>
               A Blessed Sunday
              </p>
            </div>
          </div>
        </motion.div>

        {/* Map button */}
        <motion.a
          variants={item}
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Guru Kripa Marriage Hall location in Google Maps (opens in new tab)"
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="mt-9 sm:mt-12 inline-flex items-center justify-center gap-2.5 w-full max-w-[320px] sm:w-auto px-8 py-3.5 rounded-full border no-underline cursor-pointer font-sans text-[0.7rem] sm:text-xs font-semibold tracking-[0.18em] uppercase bg-[linear-gradient(135deg,#641B2D_0%,#3d0d1c_100%)] shadow-[0_8px_28px_rgba(100,27,45,0.35)] hover:shadow-[0_12px_36px_rgba(100,27,45,0.45)] transition-shadow duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D6A85F]"
          style={{ color: '#FFE9C2', borderColor: 'rgba(214,168,95,0.5)' }}
        >
          <MapPin size={15} aria-hidden="true" />
          <span>View on Google Maps</span>
          <ExternalLink size={13} aria-hidden="true" />
        </motion.a>
      </motion.div>
    </section>
  );
}