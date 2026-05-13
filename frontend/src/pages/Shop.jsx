import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import { products } from '../data/products';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
  { value: 'rating', label: 'Top Rated' },
];

const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under KES 4,000', min: 0, max: 4000 },
  { label: 'KES 4,000 – 7,000', min: 4000, max: 7000 },
  { label: 'KES 7,000 – 12,000', min: 7000, max: 12000 },
  { label: 'Above KES 12,000', min: 12000, max: Infinity },
];

export default function Shop() {
  const [searchParams] = useSearchParams();
  const filterParam = searchParams.get('filter');
  const categoryParam = searchParams.get('category') || 'all';

  const [sort, setSort] = useState('featured');
  const [category, setCategory] = useState(categoryParam);
  const [priceRange, setPriceRange] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];

    if (filterParam === 'new') list = list.filter(p => p.isNew);
    else if (filterParam === 'bestseller') list = list.filter(p => p.isBestSeller);

    if (category !== 'all') list = list.filter(p => p.category === category);

    const range = PRICE_RANGES[priceRange];
    list = list.filter(p => p.price >= range.min && p.price <= range.max);

    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'newest') list = list.filter(p => p.isNew).concat(list.filter(p => !p.isNew));
    else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [filterParam, category, priceRange, sort]);

  const pageTitle = filterParam === 'new' ? 'New Arrivals'
    : filterParam === 'bestseller' ? 'Best Sellers'
    : category !== 'all' ? `${category.charAt(0).toUpperCase() + category.slice(1)} Abayas`
    : 'All Abayas';

  return (
    <main className="pt-28 min-h-screen">
      {/* Page header */}
      <div className="bg-ezme-cream py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-widest uppercase font-sans text-ezme-taupe mb-2" style={{ letterSpacing: '0.2em' }}>EZME Collection</p>
          <h1 className="font-serif text-4xl md:text-5xl font-light text-ezme-black">{pageTitle}</h1>
          <p className="text-ezme-taupe font-sans text-sm mt-2">{filtered.length} pieces</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8 gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-ezme-black hover:text-ezme-taupe transition-colors border border-gray-200 px-4 py-2.5 hover:border-ezme-black"
            style={{ letterSpacing: '0.12em' }}
          >
            <SlidersHorizontal size={14} />
            Filter
          </button>

          <div className="flex items-center gap-2 text-xs font-sans">
            <span className="text-ezme-taupe">Sort by</span>
            <div className="relative">
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="appearance-none border border-gray-200 px-3 py-2 pr-7 text-ezme-black outline-none focus:border-ezme-black bg-white text-xs font-sans cursor-pointer"
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-ezme-taupe pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border border-gray-100 p-6 mb-8 bg-ezme-mist grid grid-cols-2 md:grid-cols-3 gap-6"
          >
            {/* Category filter */}
            <div>
              <h4 className="text-xs tracking-widest uppercase font-sans text-ezme-taupe mb-3" style={{ letterSpacing: '0.15em' }}>Category</h4>
              <div className="space-y-2">
                {[
                  { id: 'all', label: 'All Pieces' },
                  { id: 'everyday', label: 'Everyday' },
                  { id: 'luxury', label: 'Luxury' },
                  { id: 'occasion', label: 'Occasion Wear' },
                ].map(c => (
                  <label key={c.id} className="flex items-center gap-2.5 cursor-pointer group">
                    <div
                      onClick={() => setCategory(c.id)}
                      className={`w-4 h-4 border flex items-center justify-center transition-colors cursor-pointer ${category === c.id ? 'bg-ezme-black border-ezme-black' : 'border-gray-300 group-hover:border-ezme-black'}`}
                    >
                      {category === c.id && <span className="text-white text-[10px]">✓</span>}
                    </div>
                    <span className="text-sm font-sans text-ezme-black" onClick={() => setCategory(c.id)}>{c.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price filter */}
            <div>
              <h4 className="text-xs tracking-widest uppercase font-sans text-ezme-taupe mb-3" style={{ letterSpacing: '0.15em' }}>Price Range</h4>
              <div className="space-y-2">
                {PRICE_RANGES.map((r, i) => (
                  <label key={r.label} className="flex items-center gap-2.5 cursor-pointer group">
                    <div
                      onClick={() => setPriceRange(i)}
                      className={`w-4 h-4 border flex items-center justify-center transition-colors cursor-pointer ${priceRange === i ? 'bg-ezme-black border-ezme-black' : 'border-gray-300 group-hover:border-ezme-black'}`}
                    >
                      {priceRange === i && <span className="text-white text-[10px]">✓</span>}
                    </div>
                    <span className="text-sm font-sans text-ezme-black" onClick={() => setPriceRange(i)}>{r.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => { setCategory('all'); setPriceRange(0); setSort('featured'); }}
                className="flex items-center gap-1.5 text-xs font-sans text-ezme-taupe hover:text-ezme-black transition-colors"
              >
                <X size={12} /> Clear all filters
              </button>
            </div>
          </motion.div>
        )}

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-serif text-2xl text-ezme-black mb-2">No pieces found</p>
            <p className="text-sm text-ezme-taupe font-sans">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </main>
  );
}
