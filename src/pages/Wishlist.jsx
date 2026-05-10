import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useWishlistStore } from '../store/useStore';
import ProductCard from '../components/ui/ProductCard';

export default function Wishlist() {
  const { items } = useWishlistStore();

  return (
    <main className="pt-28 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-12">
          <p className="text-xs tracking-widest uppercase font-sans text-ezme-taupe mb-2" style={{ letterSpacing: '0.2em' }}>Your Saved Pieces</p>
          <h1 className="font-serif text-4xl md:text-5xl font-light text-ezme-black">Wishlist</h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <Heart size={48} className="text-gray-200 mx-auto mb-4" />
            <h2 className="font-serif text-3xl font-light text-ezme-black mb-2">Your wishlist is empty</h2>
            <p className="text-sm text-ezme-taupe font-sans mb-8">Save pieces you love and come back for them later</p>
            <Link to="/shop" className="btn-dark px-10 py-4 text-xs">Discover Collection</Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-ezme-taupe font-sans mb-8">{items.length} saved {items.length === 1 ? 'piece' : 'pieces'}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
              {items.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
