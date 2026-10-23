import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Music } from 'lucide-react';
import './Footer.css';

/* ── Music Player ── */

const MUSIC_SRC = '/music/taylor-love-story_Dapoc.mp3';

export function MusicButton() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasAudio, setHasAudio] = useState(true);

  // useEffect(() => {
  //   const audio = new Audio(MUSIC_SRC);
  //   audio.loop = true;
  //   audio.volume = 0.5;
  //   audioRef.current = audio;

  //   audio.addEventListener('error', () => setHasAudio(false));
  //   audio.addEventListener('canplaythrough', () => setHasAudio(true));

  //   return () => {
  //     audio.pause();
  //     audio.src = '';
  //   };
  // }, []);


  useEffect(() => {
    const audio = new Audio(MUSIC_SRC);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    audio.addEventListener('error', () => setHasAudio(false));
    audio.addEventListener('canplaythrough', () => setHasAudio(true));

    // Automatically start music when the website opens
    audio.play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        // Browser may block autoplay
        setIsPlaying(false);
      });

    return () => {
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
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [isPlaying, hasAudio]);

  if (!hasAudio) return null;

  return (
    <motion.button
      className={`music-btn${isPlaying ? ' playing' : ''}`}
      onClick={toggle}
      aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
      aria-pressed={isPlaying}
      title={isPlaying ? 'Pause music' : 'Play romantic background music'}
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.5, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {isPlaying ? (
        <div className="music-bars" aria-hidden="true">
          <div className="music-bar" />
          <div className="music-bar" />
          <div className="music-bar" />
          <div className="music-bar" />
        </div>
      ) : (
        <Music size={20} aria-hidden="true" />
      )}
    </motion.button>
  );
}

/* ── Footer ── */
export default function Footer() {
  return (
    <footer className="site-footer" aria-label="Site footer">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <span className="footer-ornament" aria-hidden="true">❧</span>

        <p className="footer-names">
          With love, Ram <span className="footer-amp">&amp;</span> Sita
        </p>

        <div className="footer-divider" aria-hidden="true" />

        <p className="footer-detail">
          21 January 2027 &nbsp;·&nbsp; Utsav Bhawan, Delhi
        </p>

        <p className="footer-love-text">
          "A love story written in the stars — celebrated on Earth."
        </p>
      </motion.div>
    </footer>
  );
}
