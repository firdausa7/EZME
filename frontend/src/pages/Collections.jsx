import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { collections } from '../data/products';

const COLLECTION_IMAGES = {
  classic: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=85&auto=format&fit=crop',
  signature: 'https://images.unsplash.com/photo-1609971811545-dc9f36765d80?w=900&q=85&auto=format&fit=crop',
  occasion: 'https://images.unsplash.com/photo-1584633312681-425c7b97ccd1?w=900&q=85&auto=format&fit=crop',
  everyday: 'https://images.unsplash.com/photo-1597528380848-7ffd2f5b2ab7?w=900&q=85&auto=format&fit=crop',
  couture: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=900&q=85&auto=format&fit=crop',
};

export default function Collections() {
  return (
    <main className="pt-28 min-h-screen">
      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden bg-ezme-black">
        <img
          src="https://images.unsplash.com/photo-1583759136431-c2b4e9f97bf2?w=1800&q=85&auto=format&fit=crop"
          alt="Collections"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-xs tracking-widest uppercase font-sans text-white/50 mb-3" style={{ letterSpacing: '0.25em' }}>EZME</p>
          <h1 className="font-serif text-5xl md:text-6xl font-light text-white" style={{ letterSpacing: '0.05em' }}>
            Collections
          </h1>
        </div>
      </div>

      {/* Collections grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((col, i) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={i === 0 ? 'md:col-span-2' : ''}
            >
              <Link
                to={`/shop?collection=${col.id}`}
                className="group block relative overflow-hidden bg-ezme-mist"
                style={{ minHeight: i === 0 ? 400 : 280 }}
              >
                <img
                  src={COLLECTION_IMAGES[col.id]}
                  alt={col.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ minHeight: i === 0 ? 400 : 280 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-white/50 text-xs font-sans mb-2 tracking-widest uppercase" style={{ letterSpacing: '0.15em' }}>
                        {col.count} pieces
                      </p>
                      <h2 className="font-serif font-light text-white" style={{ fontSize: i === 0 ? '2.5rem' : '1.8rem' }}>
                        {col.name}
                      </h2>
                      <p className="text-white/60 font-sans text-sm mt-1">{col.description}</p>
                    </div>
                    <div className="w-10 h-10 border border-white/30 flex items-center justify-center text-white group-hover:bg-ezme-lavender group-hover:border-ezme-lavender transition-all shrink-0">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
