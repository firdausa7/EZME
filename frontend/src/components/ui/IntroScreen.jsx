import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroScreen() {
  const [visible, setVisible] = useState(() => !sessionStorage.getItem('ezme_intro_seen'));

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem('ezme_intro_seen', '1');
    }, 2200);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[999] bg-[#0D0D0D] flex flex-col items-center justify-center"
        >
          {/* Animated logo */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
            className="flex flex-col items-center gap-4"
          >
            <motion.img
              src="/logo.jpg"
              alt="EZME"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8, type: 'spring', stiffness: 120 }}
              className="h-36 w-36 md:h-44 md:w-44 rounded-full object-cover shadow-2xl"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="text-white/30 text-[10px] font-sans tracking-[0.4em] uppercase mt-2"
            >
              Nairobi · Kenya
            </motion.p>
          </motion.div>

          {/* Loading line */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-32 h-px bg-white/10 overflow-hidden">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
              className="w-full h-full bg-[#C9B8E8]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
