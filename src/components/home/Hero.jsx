import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Volume2, VolumeX } from 'lucide-react';

export default function Hero() {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [muted, setMuted] = useState(true);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '55%']);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  return (
    <section ref={ref} className="relative h-screen min-h-[680px] overflow-hidden bg-[#0D0D0D]">

      {/* Video */}
      <motion.div style={{ y: videoY }} className="absolute inset-0 scale-[1.08]">
        <video ref={videoRef} src="/videos/reel5.mp4" autoPlay muted loop playsInline
          onCanPlay={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1500 ${loaded ? 'opacity-100' : 'opacity-0'}`} />
        {!loaded && <img src="/thumbs/reel5_mid.jpg" alt="Ezme" className="w-full h-full object-cover" />}
      </motion.div>

      {/* Layered gradient — cinematic */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/50 via-transparent to-[#0D0D0D]/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/40 via-transparent to-transparent" />

      {/* Film grain */}
      <div className="absolute inset-0 film-grain pointer-events-none opacity-30" />

      {/* Main content */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 h-full flex flex-col justify-between py-10 px-6 max-w-7xl mx-auto"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between pt-6">
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-white/40 text-[9px] font-sans tracking-[0.35em] uppercase"
          >
            SS 2026 Collection
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-white/40 text-[9px] font-sans tracking-[0.35em] uppercase"
          >
            Nairobi, Kenya
          </motion.p>
        </div>

        {/* Centre — editorial hero text */}
        <div className="flex flex-col items-start justify-center flex-1 mt-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-5 flex items-center gap-3"
          >
            <div className="w-6 h-px bg-white/40" />
            <span className="text-white/50 text-[9px] font-sans tracking-[0.32em] uppercase">New Arrivals</span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.55 }}
              className="font-serif font-light text-white leading-none mb-2"
              style={{ fontSize: 'clamp(52px, 9vw, 120px)', letterSpacing: '-0.02em' }}
            >
              Dressed in
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.7 }}
            >
              <span
                className="logo-script text-white block leading-none"
                style={{ fontSize: 'clamp(64px, 11vw, 148px)' }}
              >
                Ezme 🦋
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 1, ease: [0.76, 0, 0.24, 1] }}
            style={{ originX: 0 }}
            className="w-full max-w-xs h-px bg-white/20 mt-7 mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="text-white/55 font-sans text-sm leading-relaxed max-w-[280px] mb-9"
            style={{ letterSpacing: '0.01em' }}
          >
            Handcrafted luxury abayas for the modern Muslim woman.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.25 }}
            className="flex flex-wrap gap-3"
          >
            <Link to="/shop"
              className="group relative overflow-hidden inline-flex items-center gap-3 bg-white text-[#0D0D0D] text-[10px] font-sans tracking-[0.2em] uppercase px-8 py-4 transition-all duration-300 hover:bg-[#C9B8E8]"
            >
              Shop the Collection
              <span className="w-4 h-px bg-current transition-all duration-300 group-hover:w-6" />
            </Link>
            <a href="https://www.instagram.com/ezme.ke" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[10px] font-sans tracking-[0.2em] uppercase text-white/60 border border-white/20 px-6 py-4 hover:border-white/50 hover:text-white transition-all duration-300"
            >
              @ezme.ke
            </a>
          </motion.div>
        </div>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex items-end justify-between pb-2"
        >
          {/* Sound */}
          <button onClick={toggleMute}
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-[9px] font-sans tracking-[0.25em] uppercase"
          >
            {muted ? <VolumeX size={13} /> : <Volume2 size={13} />}
            {muted ? 'Sound off' : 'Sound on'}
          </button>

          {/* Scroll indicator */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-px h-12 bg-white/20 relative overflow-hidden">
              <motion.div
                animate={{ y: ['-100%', '100%'] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                className="w-full h-1/2 bg-white/60"
              />
            </div>
            <span className="text-white/30 text-[8px] font-sans tracking-[0.3em] uppercase">Scroll</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
