import { useState } from 'react';
import { motion } from 'framer-motion';

const WINE = '#641B2D';
const GOLD = '#D6A85F';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const people = [
  {
    role: 'The Groom',
    name: 'Kunal Keshri',
    initials: 'K',
    image: '/logo/groom.png',
    parentsLabel: 'Son of',
    father: 'Chandra Shekhar Keshri',
    mother: 'Sunita Keshari',
  },
  {
    role: 'The Bride',
    name: 'Stuti Keshri',
    initials: 'S',
    image: '/logo/bride.png',
    parentsLabel: 'Daughter of',
    father: 'Bholanath Keshri',
    mother: 'Reeta Keshri',
  },
];

function Avatar({ src, alt, initials }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative p-[5px] sm:p-[6px] rounded-full bg-[linear-gradient(135deg,#641B2D_0%,#D6A85F_55%,#E8C88A_100%)] shadow-[0_12px_40px_rgba(100,27,45,0.25)]">
      <div className="rounded-full p-[3px] bg-[#FFF7EF]">
        {failed ? (
          <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full flex items-center justify-center bg-[linear-gradient(135deg,#F8E6E2,#FAF1E0)] font-script text-6xl" style={{ color: WINE }}>
            {initials}
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setFailed(true)}
            className="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full object-cover object-top"
          />
        )}
      </div>
    </div>
  );
}

function PersonCard({ person, index }) {
  return (
    <motion.article
      className="relative w-full flex flex-col items-center text-center rounded-2xl border px-5 sm:px-8 py-8 sm:py-10 bg-[linear-gradient(160deg,#FFFBF5_0%,#FAF1E0_100%)] shadow-[0_15px_50px_rgba(100,27,45,0.10)] hover:shadow-[0_20px_60px_rgba(100,27,45,0.18)] transition-shadow duration-500"
      style={{ borderColor: 'rgba(214,168,95,0.45)' }}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      {/* Inner thin border */}
      <div
        className="absolute inset-2 rounded-xl border pointer-events-none"
        style={{ borderColor: 'rgba(214,168,95,0.25)' }}
        aria-hidden="true"
      />

      <Avatar src={person.image} alt={person.name} initials={person.initials} />

      {/* Name */}
      <h3
        className="font-script mt-6 text-[clamp(2.2rem,7vw,3rem)] leading-tight"
        style={{ color: WINE }}
      >
        {person.name}
      </h3>

      {/* Role */}
      <p
        className="font-sans text-[0.65rem] sm:text-xs font-semibold tracking-[0.35em] uppercase mt-1"
        style={{ color: GOLD }}
      >
        {person.role}
      </p>

      {/* Divider */}
      <div className="flex items-center gap-2 my-5 w-full max-w-[220px]" aria-hidden="true">
        <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[#D6A85F]/70" />
        <span className="text-xs" style={{ color: GOLD }}>✦</span>
        <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[#D6A85F]/70" />
      </div>

      {/* Parents */}
      <p className="font-serif font-semibold italic text-md sm:text-base opacity-70" style={{ color: WINE }}>
        {person.parentsLabel}
      </p>
      <p className="font-serif font-semibold text-base sm:text-lg md:text-xl mt-1 leading-relaxed" style={{ color: WINE }}>
        Mr. {person.father}
      </p>
      <p className="font-serif font-semibold text-md italic opacity-60" style={{ color: WINE }}>&amp;</p>
      <p className="font-serif font-semibold text-base sm:text-lg md:text-xl leading-relaxed" style={{ color: WINE }}>
        Mrs. {person.mother}
      </p>
    </motion.article>
  );
}

export default function MeetTheCoupleSection() {
  return (
    <section
      id="couple"
      aria-labelledby="couple-heading"
      className="relative w-full overflow-hidden px-5 sm:px-8 py-16 sm:py-24 bg-[linear-gradient(160deg,#FFF7EF_0%,#FAF1E0_45%,#F8E6E2_100%)]"
    >
      {/* Soft background glows */}
      <div
        className="absolute -top-[10%] -right-[10%] w-[min(500px,70vw)] h-[min(500px,70vw)] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(214,168,95,0.14)_0%,transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-[10%] -left-[10%] w-[min(450px,65vw)] h-[min(450px,65vw)] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(100,27,45,0.08)_0%,transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-10 sm:mb-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p
            className="font-sans text-[0.65rem] sm:text-xs md:text-sm font-semibold tracking-[0.4em] uppercase mb-3"
            style={{ color: GOLD }}
          >
            The Bride &amp; The Groom
          </p>
          <h2
            id="couple-heading"
            className="font-serif font-bold uppercase tracking-[0.06em] text-[clamp(2rem,7vw,3.8rem)] leading-tight"
            style={{ color: WINE }}
          >
            Meet The Couple
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4" aria-hidden="true">
            <span className="h-px w-14 sm:w-24 bg-gradient-to-r from-transparent to-[#D6A85F]" />
            <span style={{ color: GOLD }}>✦</span>
            <span className="h-px w-14 sm:w-24 bg-gradient-to-l from-transparent to-[#D6A85F]" />
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-6 md:gap-4 lg:gap-8">
          <PersonCard person={people[0]} index={0} />

          {/* Ampersand */}
          <motion.div
            className="font-script text-6xl sm:text-7xl md:text-8xl text-center leading-none py-1 md:py-0"
            style={{ color: GOLD }}
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            aria-hidden="true"
          >
            &amp;
          </motion.div>

          <PersonCard person={people[1]} index={2} />
        </div>
      </div>
    </section>
  );
}