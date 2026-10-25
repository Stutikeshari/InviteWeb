import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Music, Heart } from 'lucide-react';

const GOLD = '#D6A85F';
const GOLD_LIGHT = '#E8C88A';
const CREAM = '#FFE9C2';

/* ── Music Player ── */
const MUSIC_SRC = '/music/Vakratunda Mahakaya.mp3';

export function MusicButton() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasAudio, setHasAudio] = useState(true);

  useEffect(() => {
    const audio = new Audio(MUSIC_SRC);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    const onError = () => setHasAudio(false);
    const onCanPlay = () => setHasAudio(true);
    audio.addEventListener('error', onError);
    audio.addEventListener('canplaythrough', onCanPlay);

    // Browser autoplay block kare to pehli user interaction par start karo
    const startOnInteract = () => {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
      removeListeners();
    };
    const events = ['click', 'touchstart', 'keydown', 'scroll'];
    const removeListeners = () =>
      events.forEach((ev) => window.removeEventListener(ev, startOnInteract));

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        events.forEach((ev) =>
          window.addEventListener(ev, startOnInteract, { once: true, passive: true })
        );
      });

    return () => {
      removeListeners();
      audio.removeEventListener('error', onError);
      audio.removeEventListener('canplaythrough', onCanPlay);
      audio.pause();
      audio.src = '';
    };
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !hasAudio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [isPlaying, hasAudio]);

  if (!hasAudio) return null;

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
      aria-pressed={isPlaying}
      title={isPlaying ? 'Pause music' : 'Play romantic background music'}
      className={`fixed right-4 sm:right-6 bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] sm:bottom-6 z-[100] w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-full flex items-center justify-center cursor-pointer border-[1.5px] bg-[linear-gradient(135deg,#641B2D_0%,#3d0d1c_100%)] shadow-[0_4px_20px_rgba(0,0,0,0.4),0_0_20px_rgba(214,168,95,0.18)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.5),0_0_30px_rgba(214,168,95,0.3)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E8C88A] transition-shadow duration-300 ${
        isPlaying ? 'animate-music-pulse' : ''
      }`}
      style={{ color: GOLD_LIGHT, borderColor: 'rgba(214,168,95,0.5)' }}
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.5, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {isPlaying ? (
        <div className="flex items-end gap-0.5 h-[18px]" aria-hidden="true">
          {[
            ['40%', '0s'],
            ['80%', '0.15s'],
            ['60%', '0.3s'],
            ['90%', '0.1s'],
          ].map(([h, d], i) => (
            <div
              key={i}
              className="w-[3px] rounded-[2px] animate-bar-bounce"
              style={{ height: h, animationDelay: d, backgroundColor: GOLD_LIGHT }}
            />
          ))}
        </div>
      ) : (
        <Music size={20} aria-hidden="true" />
      )}
    </motion.button>
  );
}

/* ── Footer ── */
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

export default function Footer() {
  return (
    <footer
      aria-label="Site footer"
      className="relative w-full overflow-hidden text-center px-5 sm:px-8 pt-14 sm:pt-20 pb-[calc(6rem+env(safe-area-inset-bottom,0px))] sm:pb-24 bg-[radial-gradient(ellipse_at_50%_0%,#4d1022_0%,#2a0812_55%,#14050a_100%)]"
    >
      {/* Top gold line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(420px,80vw)] h-px bg-gradient-to-r from-transparent via-[#D6A85F] to-transparent"
        aria-hidden="true"
      />

      {/* Soft glow */}
      <div
        className="absolute -top-[30%] left-1/2 -translate-x-1/2 w-[min(700px,130vw)] h-[min(700px,130vw)] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(214,168,95,0.12)_0%,transparent_65%)]"
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-3xl flex flex-col items-center"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Ornament */}
        <motion.span
          variants={item}
          className="text-3xl sm:text-4xl leading-none mb-4 select-none opacity-80"
          style={{ color: GOLD }}
          aria-hidden="true"
        >
          ❧
        </motion.span>

        {/* Names */}
        <motion.p
          variants={item}
          className="font-script leading-[1.1] text-[clamp(2.4rem,9vw,4rem)] [text-shadow:0_4px_30px_rgba(232,200,138,0.2)]"
          style={{ color: CREAM }}
        >
          With love,<br/> Kunal <span style={{ color: GOLD }}>&amp;</span> Stuti
        </motion.p>

        {/* Divider */}
        <motion.div
          variants={item}
          className="flex items-center justify-center gap-3 w-full max-w-[260px] my-6 sm:my-7"
          aria-hidden="true"
        >
          <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[#D6A85F]/80" />
          <span className="text-xs" style={{ color: GOLD }}>✦</span>
          <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[#D6A85F]/80" />
        </motion.div>

        {/* Date + venue */}
        <motion.div variants={item} className="flex flex-col items-center gap-1.5 sm:gap-2">
          <p
            className="font-sans text-[0.7rem] sm:text-sm font-semibold tracking-[0.25em] sm:tracking-[0.3em] uppercase"
            style={{ color: GOLD_LIGHT }}
          >
            22 November 2026
          </p>
          <p
            className="font-sans text-[0.62rem] sm:text-xs tracking-[0.18em] sm:tracking-[0.22em] uppercase opacity-70 leading-relaxed"
            style={{ color: GOLD }}
          >
            Guru Kripa Marriage Hall
            <span className="hidden sm:inline"> · </span>
            <span className="block sm:inline">Dhundhi Katra, Mirzapur</span>
          </p>
        </motion.div>

{/* Quote */}
<motion.p
  variants={item}
  className="font-serif italic mt-7 sm:mt-9 max-w-[32ch] sm:max-w-[48ch] text-[clamp(1rem,3vw,1.2rem)] leading-[1.7] opacity-75"
  style={{ color: CREAM }}
>
  &ldquo;Two souls, one destiny, a forever written in love.&rdquo;
</motion.p>

{/* Invitation Note */}
<motion.p
  variants={item}
  className="mt-4 sm:mt-5 max-w-[38ch] text-center font-serif text-[clamp(0.9rem,2.5vw,1.1rem)] leading-[1.8]"
  style={{ color: GOLD_LIGHT }}
>
  We cordially invite you and your family to celebrate
  this beautiful beginning of our forever.
  Your presence, love, and blessings will make our special day
  even more memorable.
</motion.p>

        

        {/* Bottom line */}
        <motion.div
          variants={item}
          className="mt-10 sm:mt-12 pt-5 w-full max-w-sm border-t flex items-center justify-center gap-2 font-sans text-[0.6rem] sm:text-[0.68rem] tracking-[0.22em] uppercase opacity-60"
          style={{ borderColor: 'rgba(214,168,95,0.2)', color: GOLD }}
        >
          <span>Made by Stuti with love</span>
          <Heart size={18} fill="currentColor" aria-hidden="true" />
          <span>for our families &amp; friends</span>
        </motion.div>
      </motion.div>
    </footer>
  );
}