import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

/* ── Particle canvas (golden dust + petals) ── */
function ParticleCanvas() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialise particles
    const COLORS = ['#D6A85F', '#E8C98A', '#F8E6E2', '#FFD700', '#C8A870'];
    const count = Math.min(80, Math.floor(window.innerWidth / 14));

    particles.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.5 + 0.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      vx: (Math.random() - 0.5) * 0.3,
      vy: -(Math.random() * 0.5 + 0.2),
      alpha: Math.random() * 0.7 + 0.2,
      fade: Math.random() * 0.008 + 0.003,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.fade;

        if (p.alpha <= 0 || p.y < -10) {
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + 10;
          p.alpha = Math.random() * 0.7 + 0.2;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />;
}

/* ── Floating Hearts ── */
const HEART_POSITIONS = [8, 20, 35, 52, 65, 78, 88];
const HEART_DELAYS = [0, 2.5, 5, 1.5, 7, 3.5, 9];
const HEART_DURATIONS = [12, 15, 11, 14, 13, 16, 10];
const HEART_SIZES = ['0.85rem', '1.1rem', '0.75rem', '1.05rem', '0.9rem', '1.15rem', '0.8rem'];

function FloatingHearts() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {HEART_POSITIONS.map((left, i) => (
        <span
          key={i}
          className="absolute -bottom-5 opacity-0 animate-float-heart"
          style={{
            left: `${left}%`,
            animationDuration: `${HEART_DURATIONS[i]}s`,
            animationDelay: `${HEART_DELAYS[i]}s`,
            fontSize: HEART_SIZES[i],
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}

/* ── Envelope SVG ── */
function EnvelopeSVG() {
  return (
    <svg
      viewBox="0 0 380 270"
      className="w-full h-full overflow-visible"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="envBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4a1525" />
          <stop offset="100%" stopColor="#2a0810" />
        </linearGradient>
        <linearGradient id="envFlap" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3d1020" />
          <stop offset="100%" stopColor="#56182a" />
        </linearGradient>
        <linearGradient id="rgBorder" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8B6520" />
          <stop offset="50%" stopColor="#D6A85F" />
          <stop offset="100%" stopColor="#8B6520" />
        </linearGradient>
        <filter id="envShadow">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#D6A85F" floodOpacity="0.2" />
        </filter>
      </defs>

      {/* Body */}
      <rect x="2" y="2" width="376" height="266" rx="10" ry="10"
        fill="url(#envBody)" stroke="url(#rgBorder)" strokeWidth="2" filter="url(#envShadow)" />

      {/* Inner shadow lines */}
      <line x1="2" y1="268" x2="189" y2="148" stroke="url(#rgBorder)" strokeWidth="1" opacity="0.5" />
      <line x1="378" y1="268" x2="189" y2="148" stroke="url(#rgBorder)" strokeWidth="1" opacity="0.5" />

      {/* Side triangles (bottom flaps) */}
      <polygon points="2,268 189,148 2,2" fill="#3a0f1c" opacity="0.6" />
      <polygon points="378,268 189,148 378,2" fill="#3a0f1c" opacity="0.6" />

      {/* Top flap */}
      <polygon points="2,2 378,2 189,148" fill="url(#envFlap)" stroke="url(#rgBorder)" strokeWidth="1.5" />

      {/* Rose-gold inner border */}
      <rect x="12" y="12" width="356" height="246" rx="6" ry="6"
        fill="none" stroke="url(#rgBorder)" strokeWidth="0.8" strokeDasharray="4,8" opacity="0.5" />

      {/* Decorative corner flourishes */}
      {[{ x: 22, y: 22 }, { x: 358, y: 22 }, { x: 22, y: 258 }, { x: 358, y: 258 }].map((pos, i) => (
        <g key={i} transform={`translate(${pos.x},${pos.y})`}>
          <circle r="3" fill="#D6A85F" opacity="0.6" />
          <circle r="6" fill="none" stroke="#D6A85F" strokeWidth="0.5" opacity="0.4" />
        </g>
      ))}
    </svg>
  );
}

/* ── Main Component ── */
export default function EnvelopeScreen({ onOpen }) {
  const handleClick = useCallback(() => {
    onOpen();
  }, [onOpen]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onOpen();
      }
    },
    [onOpen]
  );

  return (
    <motion.div
      className="min-h-[100dvh] bg-[radial-gradient(ellipse_at_center_top,_#4a1020_0%,_#350B18_40%,_#1a0509_100%)] flex flex-col items-center justify-center relative overflow-hidden p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
    >
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,_rgba(214,168,95,0.05)_0%,_transparent_50%),radial-gradient(circle_at_80%_80%,_rgba(214,168,95,0.05)_0%,_transparent_50%)]"
        aria-hidden="true"
      />
      <ParticleCanvas />
      <FloatingHearts />

      <div className="flex flex-col items-center gap-8 z-10 text-center">
        {/* Pre-text */}
        <motion.p
          className="font-sans text-[clamp(0.75rem,2vw,0.9rem)] font-normal tracking-[0.35em] uppercase text-rose-gold opacity-90"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          ✦ A Special Invitation For You ✦
        </motion.p>

        {/* Envelope */}
        <motion.div
          className="relative w-[clamp(240px,50vw,380px)] aspect-[1.4/1] cursor-pointer drop-shadow-[0_20px_60px_rgba(214,168,95,0.25)] hover:drop-shadow-[0_24px_80px_rgba(214,168,95,0.4)] transition-[filter] duration-400 focus-visible:outline-2 focus-visible:outline-rose-gold focus-visible:outline-offset-8 rounded"
          role="button"
          tabIndex={0}
          aria-label="Click to open your engagement invitation"
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          initial={{ opacity: 0, scale: 0.7, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1, type: 'spring', stiffness: 80 }}
          whileHover={{ scale: 1.04, y: -4 }}
          whileTap={{ scale: 0.98 }}
        >
          <EnvelopeSVG />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[35%] w-[clamp(60px,14vw,90px)] h-[clamp(60px,14vw,90px)] bg-[radial-gradient(circle_at_35%_35%,_#c0392b,_#8B1A1A)] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_2px_6px_rgba(255,255,255,0.15),0_0_0_3px_rgba(214,168,95,0.4)] z-5 pointer-events-none"
            aria-hidden="true"
          >
            <span className="font-script text-rose-gold-light text-[clamp(1rem,3vw,1.5rem)] [text-shadow:0_1px_3px_rgba(0,0,0,0.5)] tracking-[0.02em]">
              K &amp; S
            </span>
          </div>
        </motion.div>

        {/* Italic label */}
        <motion.p
          className="font-serif italic text-[clamp(1.1rem,3vw,1.5rem)] text-rose-gold-light tracking-[0.05em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          "A Tale of Two Hearts, Written in Destiny…"
        </motion.p>

        {/* CTA button */}
        <motion.button
          className="group relative px-10 py-3.5 bg-gradient-to-br from-rose-gold to-rose-gold-dark text-burgundy font-sans text-[clamp(0.75rem,2vw,0.85rem)] font-semibold tracking-[0.2em] uppercase rounded-full shadow-gold hover:shadow-[0_8px_40px_rgba(214,168,95,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-400 border border-white/20 overflow-hidden focus-visible:outline-2 focus-visible:outline-rose-gold-light focus-visible:outline-offset-4 cursor-pointer"
          onClick={handleClick}
          aria-label="Open the invitation"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="absolute inset-0 bg-gradient-to-br from-rose-gold-light to-rose-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full pointer-events-none" />
          <span className="relative z-10">✦ Click to Open ✦</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
