import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlistStore } from '../../store/useStore';

export default function ProductCard({ product, index = 0 }) {
  const videoRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const { toggle, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);

  const handleEnter = () => {
    setHovered(true);
    videoRef.current?.play();
  };
  const handleLeave = () => {
    setHovered(false);
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
  };

  const badgeStyles = {
    'New Arrival':   'bg-[#0D0D0D] text-white',
    'Best Seller':   'bg-[#C9B8E8] text-[#0D0D0D]',
    'Fan Favourite': 'bg-[#F2D7D9] text-[#0D0D0D]',
    'Summer Edit':   'bg-[#FAF8F5] text-[#0D0D0D]',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
      className="group"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Link to={`/product/${product.id}`} className="block">
        {/* Media container */}
        <div className="relative overflow-hidden bg-[#F5F3F0]" style={{ aspectRatio: '3/4' }}>

          {/* Thumbnail */}
          <img
            src={product.thumbnail}
            alt={product.name}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${hovered ? 'opacity-0 scale-[1.03]' : 'opacity-100 scale-100'}`}
          />

          {/* Video on hover */}
          <video
            ref={videoRef}
            src={product.video}
            muted loop playsInline preload="none"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${hovered ? 'opacity-100' : 'opacity-0'}`}
          />

          {/* Top row — badge + wishlist */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
            {product.badge ? (
              <span className={`text-[9px] font-sans tracking-[0.14em] uppercase px-2.5 py-1 ${badgeStyles[product.badge] || 'bg-[#0D0D0D] text-white'}`}>
                {product.badge}
              </span>
            ) : <span />}

            <button
              onClick={e => { e.preventDefault(); toggle(product); }}
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm transition-transform hover:scale-110"
              aria-label="Save to wishlist"
            >
              <Heart size={13} className={wishlisted ? 'fill-red-400 text-red-400' : 'text-[#0D0D0D]'} />
            </button>
          </div>

          {/* Hover CTA — slides up from bottom */}
          <motion.div
            animate={{ y: hovered ? 0 : '100%' }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute bottom-0 left-0 right-0"
          >
            <a
              href={`https://wa.me/254799932131?text=${encodeURIComponent(`Hi Ezme! 🦋 I'd like to order:\n*${product.name}*\nPrice: KES ${product.price?.toLocaleString()}\n\nPlease share payment details. Thank you!`)}`}
              target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex items-center justify-center gap-2 w-full bg-[#0D0D0D] text-white text-[9px] font-sans tracking-[0.2em] uppercase py-3.5 hover:bg-[#C9B8E8] hover:text-[#0D0D0D] transition-colors duration-300"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Order via WhatsApp
            </a>
          </motion.div>
        </div>

        {/* Product info */}
        <div className="pt-4 pb-1">
          <h3 className="font-serif text-[15px] font-light text-[#0D0D0D] leading-snug mb-1.5 group-hover:text-[#8B7355] transition-colors duration-300">
            {product.name}
          </h3>

          <div className="flex items-center justify-between">
            <p className="text-sm font-sans font-medium text-[#0D0D0D]">
              KES {product.price?.toLocaleString()}
            </p>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={10}
                  className={i < Math.floor(product.rating) ? 'fill-[#C9B8E8] text-[#C9B8E8]' : 'text-gray-200 fill-gray-200'} />
              ))}
              <span className="text-[10px] font-sans text-gray-400 ml-1">({product.reviews})</span>
            </div>
          </div>

          {/* Color swatches */}
          {product.colors?.length > 0 && (
            <div className="flex gap-1.5 mt-2.5">
              {product.colors.slice(0, 4).map(c => (
                <div key={c.name} title={c.name}
                  className="w-3 h-3 rounded-full border border-gray-200 ring-1 ring-offset-1 ring-transparent hover:ring-gray-400 transition-all"
                  style={{ backgroundColor: c.hex }} />
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
