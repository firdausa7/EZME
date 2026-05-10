import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [mode, setMode] = useState('default'); // default | hover | play | drag
  const [visible, setVisible] = useState(false);
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const dotX = useSpring(mouseX, { stiffness: 800, damping: 40 });
  const dotY = useSpring(mouseY, { stiffness: 800, damping: 40 });
  const ringX = useSpring(mouseX, { stiffness: 180, damping: 22 });
  const ringY = useSpring(mouseY, { stiffness: 180, damping: 22 });

  useEffect(() => {
    // Hide on touch devices
    if ('ontouchstart' in window) return;

    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const over = (e) => {
      const el = e.target.closest('a, button, [data-cursor]');
      if (!el) { setMode('default'); return; }
      const c = el.dataset.cursor;
      if (c === 'play') setMode('play');
      else if (c === 'drag') setMode('drag');
      else setMode('hover');
    };

    const leave = () => setVisible(false);

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });
    document.documentElement.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      document.documentElement.removeEventListener('mouseleave', leave);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        style={{ left: dotX, top: dotY }}
        animate={{
          width: mode === 'hover' ? 8 : mode === 'play' ? 0 : 6,
          height: mode === 'hover' ? 8 : mode === 'play' ? 0 : 6,
          opacity: mode === 'play' ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 600, damping: 30 }}
        className="fixed z-[9999] rounded-full bg-[#0D0D0D] pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />

      {/* Ring */}
      <motion.div
        style={{ left: ringX, top: ringY }}
        animate={{
          width: mode === 'play' ? 88 : mode === 'hover' ? 44 : mode === 'drag' ? 64 : 32,
          height: mode === 'play' ? 88 : mode === 'hover' ? 44 : mode === 'drag' ? 64 : 32,
          borderColor: mode === 'play' ? '#C9B8E8' : mode === 'hover' ? '#0D0D0D' : '#0D0D0D',
          borderWidth: mode === 'hover' ? 1.5 : 1,
          opacity: 1,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="fixed z-[9998] rounded-full border border-[#0D0D0D] pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center justify-center mix-blend-difference"
      >
        {mode === 'play' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[9px] font-sans tracking-[0.2em] text-white uppercase font-medium"
          >
            PLAY
          </motion.span>
        )}
        {mode === 'drag' && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[8px] font-sans tracking-[0.15em] text-white uppercase"
          >
            DRAG
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
