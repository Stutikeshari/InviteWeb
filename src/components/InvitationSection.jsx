import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import './InvitationSection.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function InvitationSection() {
  return (
    <section
      id="invitation"
      className="invitation-section"
      aria-labelledby="invitation-heading"
    >
      <motion.div
        className="invitation-card"
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, type: 'spring', stiffness: 60 }}
      >
        {/* Floral corner decorations */}
        <span className="floral-corner tl" aria-hidden="true">❀</span>
        <span className="floral-corner tr" aria-hidden="true">❀</span>
        <span className="floral-corner bl" aria-hidden="true">❀</span>
        <span className="floral-corner br" aria-hidden="true">❀</span>

        <div className="card-frame">
          {/* Blessing text */}
          <motion.p
            className="blessing-text"
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Together with the blessings of our families
          </motion.p>

          {/* Ornament divider */}
          <motion.div
            className="ornament-divider"
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            aria-hidden="true"
          >
            ✦ ❧ ✦
          </motion.div>

          {/* Couple names */}
          <motion.h1
            id="invitation-heading"
            className="couple-names"
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Ram <span className="ampersand">&amp;</span> Sita
          </motion.h1>

          {/* Ornament divider */}
          <motion.div
            className="ornament-divider"
            custom={3}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            aria-hidden="true"
          >
            ✦ ❧ ✦
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="tagline"
            custom={4}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            "Two hearts, one beautiful journey,
            <br />
            and a lifetime of togetherness."
          </motion.p>

          {/* Date badge */}
          <motion.div
            className="invite-date-badge"
            custom={5}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            aria-label="Engagement date: 21 January 2027"
          >
            <Calendar size={14} aria-hidden="true" />
            <span>21 January 2027 · Utsav Bhawan, Delhi</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
