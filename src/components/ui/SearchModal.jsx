import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSearchStore } from '../../store/useStore';
import { products } from '../../data/products';

export default function SearchModal() {
  const { isOpen, query, setQuery, close } = useSearchStore();
  const inputRef = useRef(null);

  const results = query.length > 1
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.collection.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            onClick={close}
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white shadow-2xl"
          >
            <div className="max-w-3xl mx-auto px-6 py-6">
              <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                <Search size={20} className="text-ezme-taupe shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search for abayas, collections, styles..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  className="flex-1 text-lg font-sans text-ezme-black placeholder-gray-300 outline-none"
                />
                <button onClick={close} className="text-ezme-taupe hover:text-ezme-black transition-colors">
                  <X size={20} />
                </button>
              </div>

              {results.length > 0 && (
                <div className="py-4">
                  {results.map(p => (
                    <Link
                      key={p.id}
                      to={`/product/${p.id}`}
                      onClick={close}
                      className="flex items-center gap-4 py-3 hover:bg-ezme-mist px-3 rounded transition-colors group"
                    >
                      <div className="w-14 h-14 bg-gray-100 overflow-hidden shrink-0">
                        <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-serif text-base text-ezme-black">{p.name}</p>
                        <p className="text-xs text-ezme-taupe font-sans capitalize">{p.collection} · KES {p.price.toLocaleString()}</p>
                      </div>
                      <ArrowRight size={14} className="text-ezme-lavender opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              )}

              {query.length > 1 && results.length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-ezme-taupe font-sans text-sm">No results for "{query}"</p>
                  <p className="text-ezme-taupe font-sans text-xs mt-1">Try searching for "classic", "embroidered", or "occasion"</p>
                </div>
              )}

              {query.length === 0 && (
                <div className="py-6">
                  <p className="text-xs tracking-widest uppercase font-sans text-ezme-taupe mb-3" style={{ letterSpacing: '0.15em' }}>Popular Searches</p>
                  <div className="flex flex-wrap gap-2">
                    {['Black Abaya', 'Pearl Embroidered', 'Occasion Wear', 'New Arrivals', 'Chiffon Abaya', 'Luxury Collection'].map(term => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-4 py-2 border border-gray-200 text-sm font-sans text-ezme-black hover:border-ezme-lavender hover:text-ezme-taupe transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
