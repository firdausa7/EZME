import { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { products } from '../data/products';
import { useCartStore, useWishlistStore } from '../store/useStore';
import ProductCard from '../components/ui/ProductCard';

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const videoRef = useRef(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoMuted, setVideoMuted] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [sizeError, setSizeError] = useState(false);

  const { toggle, isWishlisted } = useWishlistStore();

  if (!product) {
    return (
      <main className="pt-32 text-center py-20">
        <h2 className="font-serif text-3xl text-ezme-black">Product not found</h2>
        <Link to="/shop" className="mt-6 inline-block btn-dark px-8 py-3 text-xs">Back to Shop</Link>
      </main>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const toggleVideo = () => {
    if (videoPlaying) { videoRef.current?.pause(); setVideoPlaying(false); }
    else { if (videoRef.current) { videoRef.current.muted = videoMuted; videoRef.current.play(); } setVideoPlaying(true); }
  };
  const toggleVideoMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) { videoRef.current.muted = !videoRef.current.muted; setVideoMuted(videoRef.current.muted); }
  };

  const handleOrder = () => {
    if (!selectedSize) { setSizeError(true); return; }
    const msg = `Hi Ezme! 🦋 I'd like to order:\n\n*${product.name}*\nSize: ${selectedSize}\nColour: ${selectedColor || product.colors?.[0]?.name || 'Default'}\nPrice: KES ${product.price.toLocaleString()}\n\nPlease share payment details. Thank you!`;
    window.open(`https://wa.me/254799932131?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <main className="pt-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-sans text-ezme-taupe mb-8">
          <Link to="/" className="hover:text-ezme-black transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-ezme-black transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-ezme-black">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-20">
          {/* Video / Media */}
          <div>
            <div className="relative overflow-hidden bg-ezme-mist cursor-pointer" style={{ aspectRatio: '9/16', maxHeight: 700 }} onClick={toggleVideo}>
              <img src={product.thumbnail} alt={product.name}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${videoPlaying ? 'opacity-0' : 'opacity-100'}`} />
              <video ref={videoRef} src={product.video} muted loop playsInline
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${videoPlaying ? 'opacity-100' : 'opacity-0'}`} />

              {/* Play/pause button */}
              <motion.div
                animate={{ opacity: videoPlaying ? 0 : 1, scale: videoPlaying ? 0.8 : 1 }}
                transition={{ duration: 0.2 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center"
              >
                {videoPlaying ? <Pause size={18} className="text-white fill-white" /> : <Play size={18} className="text-white fill-white ml-1" />}
              </motion.div>

              {/* Watermark */}
              <div className="absolute bottom-5 left-5 opacity-60">
                <span className="logo-script text-white text-xl">Ezme 🦋</span>
              </div>

              {/* Sound + tap hint */}
              <div className="absolute bottom-5 right-5 flex items-center gap-2">
                {videoPlaying && (
                  <button onClick={toggleVideoMute}
                    className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                    {videoMuted ? <VolumeX size={13} className="text-white" /> : <Volume2 size={13} className="text-white" />}
                  </button>
                )}
                {!videoPlaying && (
                  <span className="text-white/60 text-[10px] font-sans tracking-wider bg-black/30 px-2 py-1 rounded-full">Tap to play</span>
                )}
              </div>
            </div>

            {/* Thumbnail strip */}
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-3">
                {product.images.map((img, i) => (
                  <div key={i} className="w-16 h-20 overflow-hidden bg-ezme-mist">
                    <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            {product.badge && (
              <span className="text-[10px] font-sans tracking-widest uppercase bg-ezme-blush text-ezme-black px-3 py-1 self-start mb-4"
                style={{ letterSpacing: '0.14em' }}>{product.badge}</span>
            )}

            <h1 className="font-serif text-3xl md:text-4xl font-light text-ezme-black mb-3 leading-tight">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} className={i < Math.floor(product.rating) ? 'fill-ezme-lavender text-ezme-lavender' : 'text-gray-200'} />
                ))}
              </div>
              <span className="text-xs text-ezme-taupe font-sans">{product.rating} ({product.reviews} reviews)</span>
            </div>

            <div className="w-8 h-0.5 bg-ezme-lavender mb-6" />

            {/* Price */}
            <div className="mb-6 p-4 bg-ezme-cream">
              <p className="text-xs font-sans text-ezme-taupe mb-1">Price</p>
              <p className="font-serif text-2xl text-ezme-black">
                KES {product.price.toLocaleString()}
              </p>
              <p className="text-xs text-ezme-taupe font-sans mt-1">Order via WhatsApp · Delivery arranged on purchase</p>
            </div>

            {/* Colour */}
            {product.colors && (
              <div className="mb-5">
                <p className="text-xs tracking-widest uppercase font-sans text-ezme-taupe mb-3" style={{ letterSpacing: '0.14em' }}>
                  Colour: <span className="text-ezme-black">{selectedColor || product.colors[0]?.name}</span>
                </p>
                <div className="flex gap-2">
                  {product.colors.map(c => (
                    <button key={c.name} onClick={() => setSelectedColor(c.name)} title={c.name}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === c.name ? 'border-ezme-black scale-110 shadow-sm' : 'border-gray-200 hover:border-gray-400'}`}
                      style={{ backgroundColor: c.hex }} />
                  ))}
                </div>
              </div>
            )}

            {/* Size */}
            <div className="mb-6">
              <p className={`text-xs tracking-widest uppercase font-sans mb-3 ${sizeError ? 'text-red-500' : 'text-ezme-taupe'}`}
                style={{ letterSpacing: '0.14em' }}>
                {sizeError ? '⚠ Please select a size' : 'Size'}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(s => (
                  <button key={s} onClick={() => { setSelectedSize(s); setSizeError(false); }}
                    className={`h-10 px-4 text-xs font-sans rounded-lg border transition-all ${s === 'Custom Made' ? 'w-full mt-1' : 'min-w-[52px]'} ${selectedSize === s ? 'bg-ezme-black text-white border-ezme-black' : 'border-gray-200 text-ezme-black hover:border-ezme-black'}`}>
                    {s === 'Custom Made' ? '✂ Custom Made — WhatsApp us your measurements' : s}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-ezme-taupe font-sans mt-2">Sizes are in centimetres (cm) · Custom Made available on all styles</p>
            </div>

            {/* CTAs */}
            <div className="space-y-3 mb-6">
              <button onClick={handleOrder}
                className="btn-wa w-full py-4 text-xs flex items-center justify-center gap-2">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Order via WhatsApp
              </button>

              <button
                onClick={() => toggle(product)}
                className="btn-outline w-full py-4 text-xs flex items-center justify-center gap-2"
              >
                <Heart size={15} className={isWishlisted(product.id) ? 'fill-red-400 text-red-400' : ''} />
                {isWishlisted(product.id) ? 'Saved to Wishlist' : 'Save to Wishlist'}
              </button>
            </div>

            {/* Trust */}
            <div className="grid grid-cols-3 gap-3 bg-ezme-cream p-4 mb-6">
              {[{ i: '🤍', l: 'Handcrafted', s: 'Made in Kenya' }, { i: '↩️', l: 'Easy Returns', s: '7-day policy' }, { i: '🔒', l: 'Secure Pay', s: 'M-PESA & Card' }].map(b => (
                <div key={b.l} className="text-center">
                  <div className="text-lg mb-1">{b.i}</div>
                  <p className="text-[10px] font-sans font-medium text-ezme-black">{b.l}</p>
                  <p className="text-[9px] font-sans text-ezme-taupe">{b.s}</p>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="border-t border-gray-100">
              <div className="flex">
                {['description', 'details'].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`px-5 py-3.5 text-[11px] tracking-widest uppercase font-sans capitalize transition-colors ${activeTab === tab ? 'border-b-2 border-ezme-black text-ezme-black' : 'text-ezme-taupe hover:text-ezme-black'}`}
                    style={{ letterSpacing: '0.12em' }}>
                    {tab}
                  </button>
                ))}
              </div>
              <div className="py-5">
                {activeTab === 'description' && (
                  <p className="text-sm font-sans text-ezme-taupe leading-relaxed">{product.description}</p>
                )}
                {activeTab === 'details' && (
                  <ul className="space-y-2.5">
                    {product.details.map((d, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-sm font-sans text-ezme-taupe">
                        <span className="w-1.5 h-1.5 rounded-full bg-ezme-lavender shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-24">
            <div className="text-center mb-10">
              <p className="eyebrow mb-3">You May Also Love</p>
              <h2 className="section-heading">Related Pieces</h2>
              <span className="divider" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
