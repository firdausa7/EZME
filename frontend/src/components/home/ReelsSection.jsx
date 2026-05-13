import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Volume2, VolumeX } from 'lucide-react';
import { products } from '../../data/products';

function ReelCard({ product, index, globalMuted, onUnmute }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.muted = globalMuted;
      videoRef.current.play();
      setPlaying(true);
    }
  };
  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setPlaying(false);
  };
  const handleTap = () => {
    if (playing) {
      videoRef.current?.pause();
      setPlaying(false);
    } else {
      if (videoRef.current) {
        videoRef.current.muted = globalMuted;
        videoRef.current.play();
        setPlaying(true);
      }
    }
  };

  const handleOrder = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(`https://wa.me/254799932131?text=${encodeURIComponent(`Hi Ezme! 🦋 I'm interested in: ${product.name}. Please send me details and pricing!`)}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="relative flex-shrink-0 w-[200px] sm:w-[240px] md:w-[260px] group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleTap}
    >
      <div className="relative overflow-hidden bg-gray-100" style={{ aspectRatio: '9/16' }}>
        <img
          src={product.thumbnail}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${playing ? 'opacity-0' : 'opacity-100'}`}
        />
        <video
          ref={videoRef}
          src={product.video}
          muted loop playsInline preload="metadata"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${playing ? 'opacity-100' : 'opacity-0'}`}
        />

        <div className="absolute inset-0 video-overlay" />

        {/* Play icon */}
        <motion.div
          animate={{ opacity: playing ? 0 : 1, scale: playing ? 0.8 : 1 }}
          transition={{ duration: 0.2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
        >
          <Play size={16} className="text-white fill-white ml-0.5" />
        </motion.div>

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <span className="bg-white text-ezme-black text-[9px] font-sans tracking-widest uppercase px-2.5 py-1 rounded-full">
              {product.badge}
            </span>
          </div>
        )}

        {/* Sound indicator when playing */}
        {playing && (
          <button
            onClick={(e) => { e.stopPropagation(); onUnmute(); }}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center"
          >
            {globalMuted
              ? <VolumeX size={12} className="text-white" />
              : <Volume2 size={12} className="text-white" />
            }
          </button>
        )}

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="font-serif text-white text-base font-light leading-tight mb-3">{product.name}</p>
          <div className="flex gap-2">
            <Link
              to={`/product/${product.id}`}
              onClick={e => e.stopPropagation()}
              className="flex-1 text-center py-2.5 bg-white text-ezme-black text-[10px] font-sans tracking-widest uppercase hover:bg-ezme-cream transition-colors"
              style={{ letterSpacing: '0.1em' }}
            >
              View
            </Link>
            <button
              onClick={handleOrder}
              className="flex-1 py-2.5 bg-ezme-black text-white text-[10px] font-sans tracking-widest uppercase hover:bg-ezme-charcoal transition-colors"
              style={{ letterSpacing: '0.1em' }}
            >
              Order
            </button>
          </div>
        </div>

        <div className="absolute top-3 right-3 opacity-70 group-hover:opacity-0 transition-opacity">
          <span className="logo-script text-white text-sm">Ezme 🦋</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ReelsSection() {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [globalMuted, setGlobalMuted] = useState(true);

  const onMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };
  const onMouseLeave = () => setIsDragging(false);
  const onMouseUp = () => setIsDragging(false);
  const onMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = scrollLeft - (x - startX) * 1.5;
  };

  return (
    <section className="py-24 md:py-32 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between"
        >
          <div>
            <p className="eyebrow mb-2">Shop the Reels</p>
            <h2 className="section-heading">As Seen on <span className="logo-script">@ezme.ke</span></h2>
          </div>
          <div className="flex items-center gap-3">
            {/* Global sound toggle */}
            <button
              onClick={() => setGlobalMuted(m => !m)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-ezme-black hover:border-ezme-black transition-all text-xs font-sans"
            >
              {globalMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              {globalMuted ? 'Sound Off' : 'Sound On'}
            </button>
            <a
              href="https://www.instagram.com/ezme.ke"
              target="_blank" rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 text-[11px] font-sans text-ezme-black hover:text-ezme-taupe transition-colors tracking-widest uppercase border-b border-ezme-black hover:border-ezme-taupe pb-0.5"
              style={{ letterSpacing: '0.14em' }}
            >
              Follow @ezme.ke
            </a>
          </div>
        </motion.div>
        <span className="divider" />
        <p className="text-center text-xs text-ezme-taupe font-sans mt-4">Hover to play · Drag to scroll</p>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 px-6 overflow-x-auto pb-4 select-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        <div className="flex-shrink-0 w-0 md:w-8" />
        {products.map((p, i) => (
          <ReelCard
            key={p.id}
            product={p}
            index={i}
            globalMuted={globalMuted}
            onUnmute={() => setGlobalMuted(m => !m)}
          />
        ))}
        <div className="flex-shrink-0 w-0 md:w-8" />
      </div>
    </section>
  );
}
