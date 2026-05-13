import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { products } from '../../data/products';

function FeedTile({ product, index }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  return (
    <motion.a
      href="https://www.instagram.com/ezme.ke"
      target="_blank" rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="relative aspect-square overflow-hidden block bg-ezme-mist group"
      onMouseEnter={() => { videoRef.current?.play(); setPlaying(true); }}
      onMouseLeave={() => { videoRef.current?.pause(); if (videoRef.current) videoRef.current.currentTime = 0; setPlaying(false); }}
    >
      <img src={product.thumbnail} alt={product.name}
        className={`w-full h-full object-cover transition-opacity duration-500 ${playing ? 'opacity-0' : 'opacity-100'}`} />
      <video ref={videoRef} src={product.video} muted loop playsInline preload="none"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${playing ? 'opacity-100' : 'opacity-0'}`} />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
        <Play size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity fill-white" />
      </div>
      {/* Instagram logo */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-80 transition-opacity">
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      </div>
    </motion.a>
  );
}

export default function InstagramFeed() {
  return (
    <section className="py-20 md:py-28 bg-ezme-cream">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <p className="eyebrow mb-3">Follow Along</p>
          <h2 className="section-heading mb-2">
            <span className="logo-script text-5xl md:text-6xl">@ezme.ke</span>
          </h2>
          <span className="divider" />
          <p className="text-xs text-ezme-taupe font-sans mt-4">Hover to play · Tap to follow</p>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5 md:gap-2">
          {products.map((p, i) => <FeedTile key={p.id} product={p} index={i} />)}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://www.instagram.com/ezme.ke"
            target="_blank" rel="noopener noreferrer"
            className="btn-dark px-10 py-4 text-xs inline-flex items-center gap-3"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            Follow @ezme.ke on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
