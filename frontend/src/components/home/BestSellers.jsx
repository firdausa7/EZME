import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../ui/ProductCard';
import { products, categories } from '../../data/products';

export default function BestSellers() {
  const [active, setActive] = useState('all');
  const filtered = active === 'all' ? products.filter(p => p.isBestSeller) : products.filter(p => p.isBestSeller && p.category === active);

  return (
    <section className="py-20 md:py-28 bg-ezme-cream">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-4">
          <p className="eyebrow mb-3">Community Favourites</p>
          <h2 className="section-heading">Best Sellers</h2>
          <span className="divider" />
        </motion.div>

        {/* Filter pills */}
        <div className="flex items-center justify-center gap-2 mt-8 mb-10 flex-wrap">
          {categories.map(c => (
            <button key={c.id} onClick={() => setActive(c.id)}
              className={`px-5 py-2 rounded-full text-[11px] font-sans tracking-widest uppercase transition-all ${
                active === c.id ? 'bg-ezme-black text-white' : 'bg-white text-ezme-taupe border border-gray-200 hover:border-ezme-black hover:text-ezme-black'
              }`}
              style={{ letterSpacing: '0.12em' }}>
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>

        <div className="text-center mt-12">
          <Link to="/shop" className="btn-dark px-12 py-4 text-xs">Shop All Pieces</Link>
        </div>
      </div>
    </section>
  );
}
