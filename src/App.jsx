import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import EnvelopeScreen from './components/EnvelopeScreen';
import InvitationSection from './components/InvitationSection';
import ScratchCard from './components/ScratchCard';
import VenueSection from './components/VenueSection';
import BlessingsForm from './components/BlessingsForm';
import Footer, { MusicButton } from './components/Footer';
import './index.css';
import './App.css';

/* Cinematic page reveal variants */
const pageReveal = {
  hidden: { opacity: 0, scale: 1.04 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    // Scroll to top so invitation starts at the top
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      {/* Accessibility: Skip to main content */}
      <a href="#invitation" className="skip-link">
        Skip to invitation
      </a>

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <EnvelopeScreen key="envelope" onOpen={handleOpen} />
        ) : (
          <motion.main
            key="invitation"
            className="invitation-wrapper"
            variants={pageReveal}
            initial="hidden"
            animate="visible"
            id="main-content"
            aria-label="Ram and Sita engagement invitation"
          >
            {/* 1. Invitation */}
            <InvitationSection />

            <div className="section-divider" aria-hidden="true" />

            {/* 2. Scratch Card */}
            <ScratchCard />

            <div className="section-divider" aria-hidden="true" />

            {/* 3. Venue */}
            <VenueSection />

            <div className="section-divider" aria-hidden="true" />

            {/* 4. Blessings Form */}
            <BlessingsForm />

            {/* 5. Footer */}
            <Footer />

            {/* 6. Music Button (fixed overlay) */}
            <MusicButton />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
