import { motion } from 'framer-motion';
import { MapPin, ExternalLink, Calendar, Clock } from 'lucide-react';
import './VenueSection.css';

const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Utsav+Bhawan+Delhi';

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
});

export default function VenueSection() {
  return (
    <section
      id="venue"
      className="venue-section"
      aria-labelledby="venue-heading"
    >
      <motion.div
        className="venue-card"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.9, type: 'spring', stiffness: 65 }}
      >
        {/* Floral decoration */}
        <motion.span
          className="venue-decoration"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp(0)}
          aria-hidden="true"
        >
          ❧
        </motion.span>

        {/* Pre-label */}
        <motion.p
          className="venue-pre-label"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp(0.1)}
        >
          ✦ Venue Details ✦
        </motion.p>

        {/* Icon */}
        <motion.div
          className="venue-icon-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp(0.2)}
          aria-hidden="true"
        >
          <MapPin size={28} strokeWidth={1.5} />
        </motion.div>

        {/* Venue name */}
        <motion.h2
          id="venue-heading"
          className="venue-name"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp(0.3)}
        >
          Utsav Bhawan
        </motion.h2>

        {/* Location */}
        <motion.p
          className="venue-location"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp(0.38)}
        >
          Delhi, India
        </motion.p>

        <motion.div
          className="venue-divider"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp(0.44)}
          aria-hidden="true"
        />

        {/* Date & time row */}
        <motion.div
          className="venue-date-row"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp(0.5)}
          aria-label="Event details: 21 January 2027"
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Calendar size={14} aria-hidden="true" />
            21 January 2027
          </span>
          <span className="venue-dot" aria-hidden="true">●</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Clock size={14} aria-hidden="true" />
            An Auspicious Day
          </span>
        </motion.div>

        {/* Map button */}
        <motion.a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="venue-map-btn"
          aria-label="Open Utsav Bhawan location in Google Maps (opens in new tab)"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp(0.58)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <MapPin size={14} aria-hidden="true" />
          <span>View on Google Maps</span>
          <ExternalLink size={12} aria-hidden="true" />
        </motion.a>
      </motion.div>
    </section>
  );
}
