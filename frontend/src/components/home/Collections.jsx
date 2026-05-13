import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';

const tiles = [
  { product: products[4], span: 'col-span-2 md:col-span-1 row-span-2', tall: true, label: 'Signature Pieces' },
  { product: products[1], span: 'col-span-2 md:col-span-1', tall: false, label: 'Everyday Luxury' },
  { product: products[5], span: 'col-span-2 md:col-span-1', tall: false, label: 'Occasion Wear' },
];

function VideoTile({ product, tall, label, span }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className={`${span} relative overflow-hidden group cursor-pointer bg-ezme-mist`}
      style={{ minHeight: tall ? 520 : 240 }}
      onMouseEnter={() => { videoRef.current?.play(); setPlaying(true); }}
      onMouseLeave={() => { videoRef.current?.pause(); if (videoRef.current) videoRef.current.currentTime = 0; setPlaying(false); }}
    >
      <Link to={`/product/${product.id}`} className="block w-full h-full" style={{ minHeight: tall ? 520 : 240 }}>
        <img src={product.thumbnail} alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${playing ? 'opacity-0' : 'opacity-100'}`} />
        <video ref={videoRef} src={product.video} muted loop playsInline preload="none"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${playing ? 'opacity-100' : 'opacity-0'}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-5 left-5 right-5">
          <p className="text-white/60 text-[10px] font-sans tracking-widest uppercase mb-1" style={{ letterSpacing: '0.16em' }}>{label}</p>
          <h3 className="font-serif text-white font-light" style={{ fontSize: tall ? '1.6rem' : '1.3rem' }}>{product.name}</h3>
          <p className="mt-2 text-white text-xs font-sans opacity-0 group-hover:opacity-100 transition-opacity tracking-wider">Shop Now →</p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Collections() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="eyebrow mb-3">Curated For You</p>
          <h2 className="section-heading">Shop the Look</h2>
          <span className="divider" />
        </motion.div>

        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {tiles.map((t, i) => <VideoTile key={i} {...t} />)}
        </div>

        <div className="text-center mt-10">
          <Link to="/collections" className="btn-outline px-12 py-4 text-xs">All Collections</Link>
        </div>
      </div>
    </section>
  );
}
