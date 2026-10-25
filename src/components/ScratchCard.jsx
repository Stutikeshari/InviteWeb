import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

/* Scratch threshold — reveal when 55% scratched */
const REVEAL_THRESHOLD = 0.55;
const BRUSH_RADIUS = 28;

function useCanvasScratch(canvasRef, onReveal) {
  const isDrawing = useRef(false);
  const revealed = useRef(false);

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const scratch = useCallback(
    (e) => {
      if (!isDrawing.current || revealed.current) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const pos = getPos(e, canvas);

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, BRUSH_RADIUS, 0, Math.PI * 2);
      ctx.fill();

      // Check reveal percentage every few scratches
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let transparent = 0;
      for (let i = 3; i < imageData.data.length; i += 4) {
        if (imageData.data[i] < 128) transparent++;
      }
      const ratio = transparent / (canvas.width * canvas.height);
      if (ratio >= REVEAL_THRESHOLD && !revealed.current) {
        revealed.current = true;
        // Fade out canvas
        let alpha = 1;
        const fade = setInterval(() => {
          alpha -= 0.05;
          canvas.style.opacity = Math.max(alpha, 0);
          if (alpha <= 0) {
            clearInterval(fade);
            canvas.style.pointerEvents = 'none';
            onReveal();
          }
        }, 20);
      }
    },
    [canvasRef, onReveal]
  );

  const startDraw = useCallback(() => {
    isDrawing.current = true;
  }, []);

  const stopDraw = useCallback(() => {
    isDrawing.current = false;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mouseup', stopDraw);
    canvas.addEventListener('mouseleave', stopDraw);
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('touchstart', startDraw, { passive: true });
    canvas.addEventListener('touchend', stopDraw);
    canvas.addEventListener('touchmove', scratch, { passive: false });

    return () => {
      canvas.removeEventListener('mousedown', startDraw);
      canvas.removeEventListener('mouseup', stopDraw);
      canvas.removeEventListener('mouseleave', stopDraw);
      canvas.removeEventListener('mousemove', scratch);
      canvas.removeEventListener('touchstart', startDraw);
      canvas.removeEventListener('touchend', stopDraw);
      canvas.removeEventListener('touchmove', scratch);
    };
  }, [canvasRef, scratch, startDraw, stopDraw]);
}

function ScratchCanvas({ onReveal }) {
  const canvasRef = useRef(null);
  useCanvasScratch(canvasRef, onReveal);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const wrapper = canvas.parentElement;
    const W = wrapper.clientWidth;
    const H = wrapper.clientHeight;
    canvas.width = W;
    canvas.height = H;

    const ctx = canvas.getContext('2d');

    // Draw the scratchable surface — metallic rose-gold texture
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, '#8B6520');
    grad.addColorStop(0.25, '#D6A85F');
    grad.addColorStop(0.5, '#E8C98A');
    grad.addColorStop(0.75, '#D6A85F');
    grad.addColorStop(1, '#8B6520');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Add texture noise
    for (let i = 0; i < 3000; i++) {
      const x = Math.random() * W;
      const y = Math.random() * H;
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.08})`;
      ctx.fillRect(x, y, 1, 1);
    }

    // Instructional text
    ctx.fillStyle = 'rgba(53, 11, 24, 0.55)';
    ctx.font = `bold ${Math.round(W * 0.038)}px Montserrat, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦ Scratch Here ✦', W / 2, H / 2);

    // Resize observer
    const ro = new ResizeObserver(() => {
      const newW = wrapper.clientWidth;
      const newH = wrapper.clientHeight;
      canvas.width = newW;
      canvas.height = newH;
      // Re-draw
      const g2 = ctx.createLinearGradient(0, 0, newW, newH);
      g2.addColorStop(0, '#8B6520');
      g2.addColorStop(0.5, '#E8C98A');
      g2.addColorStop(1, '#8B6520');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, newW, newH);
      ctx.fillStyle = 'rgba(53, 11, 24, 0.55)';
      ctx.font = `bold ${Math.round(newW * 0.038)}px Montserrat, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✦ Scratch Here ✦', newW / 2, newH / 2);
    });
    ro.observe(wrapper);
    return () => ro.disconnect();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 touch-none rounded-2xl transition-opacity duration-500"
      aria-label="Scratch this card to reveal the date"
      role="img"
    />
  );
}

export default function ScratchCard() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const handleReveal = useCallback(() => {
    setIsRevealed(true);
  }, []);

  return (
    <section
      id="scratch-card"
      className="min-h-[100dvh] bg-[linear-gradient(160deg,#350B18_0%,#4a1020_50%,#350B18_100%)] flex flex-col items-center justify-center py-16 px-8 relative overflow-hidden scroll-mt-0"
      aria-labelledby="scratch-heading"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_20%_50%,_rgba(214,168,95,0.07)_0%,_transparent_60%),radial-gradient(ellipse_at_80%_50%,_rgba(214,168,95,0.07)_0%,_transparent_60%)]"
        aria-hidden="true"
      />

      {/* Heading */}
      <motion.div
        className="text-center mb-10 z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <p className="font-sans text-[clamp(0.65rem,1.8vw,0.75rem)] tracking-[0.3em] uppercase text-rose-gold opacity-80 mb-3">
          ✦ A Hidden Surprise ✦
        </p>
        <h2 id="scratch-heading" className="font-serif text-[clamp(1.5rem,5vw,2.5rem)] font-semibold text-ivory tracking-[0.03em]">
          Scratch to Reveal Our Special Day
        </h2>
        <p className="font-serif italic text-[clamp(0.85rem,2.5vw,1rem)] text-rose-gold-light mt-2 opacity-75">
          Use your finger or mouse to uncover the magic
        </p>
      </motion.div>

      {/* Card */}
      <motion.div
        className="relative inline-block z-10"
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, delay: 0.2, type: 'spring', stiffness: 70 }}
      >
        <div
          className="relative w-[clamp(280px,80vw,420px)] h-[clamp(160px,45vw,240px)] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_2px_#D6A85F,0_0_40px_rgba(214,168,95,0.2)] cursor-crosshair"
          onMouseEnter={() => setHasStarted(true)}
          onTouchStart={() => setHasStarted(true)}
        >
          {/* Reveal layer (underneath) */}
{/* Save the Date Card Content */}
<div className="absolute inset-0 bg-gradient-to-br from-ivory via-blush to-[#f0ddd5] flex flex-col items-center justify-center gap-3 px-3 sm:px-6 py-5 text-center"
  aria-hidden={!isRevealed}
>
  <p className="font-sans text-[0.6rem] sm:text-lg font-semibold tracking-[0.25em] uppercase text-text-light">
    ✦ Save the Date ✦
  </p>

  <p
    className="font-script text-[clamp(1.8rem,6vw,3.8rem)] text-wine leading-tight whitespace-nowrap [text-shadow:0_2px_15px_rgba(100,27,45,0.2)]"
    aria-label="22 November 2026"
  >
    22 November 2026
  </p>

{/* <div className="mt-1 flex flex-col items-center gap-1.5 max-w-full">
  <p className="font-serif text-xl font-extrabold text-wine leading-snug">
    Guru Kripa Marriage Hall
  </p>

  <p className="font-sans text-xl font-extrabold text-text-medium leading-relaxed">
    Dhundhi Katra, Mirzapur
  </p>
</div> */}
</div>

          {/* Canvas scratch layer */}
          <ScratchCanvas onReveal={handleReveal} />
        </div>

        {/* Hint text */}
        <p className={`mt-4 font-sans text-[clamp(0.7rem,1.8vw,0.8rem)] text-[#f8e6e2]/50 tracking-[0.1em] text-center animate-pulse ${isRevealed || hasStarted ? 'hidden' : ''}`} aria-live="polite">
          👆 Scratch the golden card above
        </p>

        {/* Revealed confirmation */}
        <div
          className={`flex items-center justify-center gap-2 mt-6 font-sans text-xs tracking-[0.15em] uppercase text-rose-gold transition-all duration-500 ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}
          aria-live="polite"
          role="status"
        >
          <Sparkles size={16} aria-hidden="true" />
          <span>✦ The date is revealed! ✦</span>
          <Sparkles size={16} aria-hidden="true" />
        </div>
      </motion.div>
    </section>
  );
}
