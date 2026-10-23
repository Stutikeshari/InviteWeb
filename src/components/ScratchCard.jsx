import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import './ScratchCard.css';

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
      className="scratch-canvas"
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
      className="scratch-section"
      aria-labelledby="scratch-heading"
    >
      {/* Heading */}
      <motion.div
        className="scratch-heading-group"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <p className="scratch-pre-label">✦ A Hidden Surprise ✦</p>
        <h2 id="scratch-heading" className="scratch-heading">
          Scratch to Reveal Our Special Day
        </h2>
        <p className="scratch-subtext">
          Use your finger or mouse to uncover the magic
        </p>
      </motion.div>

      {/* Card */}
      <motion.div
        className="scratch-card-outer"
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, delay: 0.2, type: 'spring', stiffness: 70 }}
      >
        <div
          className="scratch-card-wrapper"
          onMouseEnter={() => setHasStarted(true)}
          onTouchStart={() => setHasStarted(true)}
        >
          {/* Reveal layer (underneath) */}
          <div className="scratch-reveal-layer" aria-hidden={!isRevealed}>
            <p className="reveal-label">Save the Date</p>
            <p className="reveal-date" aria-label="21 January 2027">21 January 2027</p>
            <p className="reveal-sub">Ram &amp; Sita · Utsav Bhawan, Delhi</p>
          </div>

          {/* Canvas scratch layer */}
          <ScratchCanvas onReveal={handleReveal} />
        </div>

        {/* Hint text */}
        <p className={`scratch-hint${isRevealed || hasStarted ? ' hidden' : ''}`} aria-live="polite">
          👆 Scratch the golden card above
        </p>

        {/* Revealed confirmation */}
        <div
          className={`scratch-revealed-badge${isRevealed ? ' visible' : ''}`}
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
