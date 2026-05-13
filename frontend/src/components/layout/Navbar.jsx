import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, Search, Menu, X } from 'lucide-react';
import { useCartStore, useWishlistStore, useSearchStore } from '../../store/useStore';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Collections', to: '/collections' },
  { label: 'About', to: '/about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { openCart } = useCartStore();
  const { items: wishItems } = useWishlistStore();
  const { open: openSearch } = useSearchStore();
  const cartCount = useCartStore(s => s.items.reduce((a, i) => a + i.quantity, 0));
  const isHome = location.pathname === '/';

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  const transparent = isHome && !scrolled;

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          transparent ? 'bg-transparent' : 'bg-white/95 backdrop-blur-md shadow-soft border-b border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between h-16 md:h-20">
          {/* Left nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.slice(0, 2).map(l => (
              <Link key={l.label} to={l.to}
                className={`text-[11px] tracking-widest uppercase font-sans transition-colors duration-200 ${transparent ? 'text-white/80 hover:text-white' : 'text-ezme-black hover:text-ezme-taupe'}`}
                style={{ letterSpacing: '0.18em' }}>
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Logo — centred */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <img src="/logo.jpg" alt="EZME" className="h-10 md:h-12 w-10 md:w-12 rounded-full object-cover shadow-md" />
          </Link>

          {/* Right nav + icons */}
          <div className="flex items-center gap-5 md:gap-8">
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.slice(2).map(l => (
                <Link key={l.label} to={l.to}
                  className={`text-[11px] tracking-widest uppercase font-sans transition-colors ${transparent ? 'text-white/80 hover:text-white' : 'text-ezme-black hover:text-ezme-taupe'}`}
                  style={{ letterSpacing: '0.18em' }}>
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button onClick={openSearch} className={`p-1.5 transition-colors ${transparent ? 'text-white' : 'text-ezme-black hover:text-ezme-taupe'}`}>
                <Search size={17} />
              </button>
              <Link to="/wishlist" className={`relative p-1.5 transition-colors ${transparent ? 'text-white' : 'text-ezme-black hover:text-ezme-taupe'}`}>
                <Heart size={17} />
                {wishItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-ezme-black text-white text-[9px] rounded-full flex items-center justify-center">{wishItems.length}</span>
                )}
              </Link>
              <button onClick={openCart} className={`relative p-1.5 transition-colors ${transparent ? 'text-white' : 'text-ezme-black hover:text-ezme-taupe'}`}>
                <ShoppingBag size={17} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-ezme-black text-white text-[9px] rounded-full flex items-center justify-center">{cartCount}</span>
                )}
              </button>
              <button className="md:hidden p-1.5" onClick={() => setMobileOpen(true)}>
                <Menu size={20} className={transparent ? 'text-white' : 'text-ezme-black'} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-72 bg-white z-50 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <img src="/logo.jpg" alt="EZME" className="h-9 w-9 rounded-full object-cover" />
                <button onClick={() => setMobileOpen(false)}><X size={20} className="text-ezme-black" /></button>
              </div>
              <nav className="flex-1 p-6 space-y-1">
                {navLinks.map(l => (
                  <Link key={l.label} to={l.to}
                    className="block py-4 text-sm font-sans tracking-widest uppercase text-ezme-black border-b border-gray-50 hover:text-ezme-taupe transition-colors"
                    style={{ letterSpacing: '0.16em' }}>
                    {l.label}
                  </Link>
                ))}
              </nav>
              <div className="p-6">
                <a href="https://www.instagram.com/ezme.ke" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-sans text-ezme-taupe">
                  <span>@ezme.ke</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
