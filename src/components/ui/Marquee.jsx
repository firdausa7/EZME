import { motion } from 'framer-motion';

const ITEMS = [
  'Luxury Abayas',
  '🦋',
  'Made in Nairobi',
  '🦋',
  'New Collection 2026',
  '🦋',
  'Handcrafted in Kenya',
  '🦋',
  '@ezme.ke',
  '🦋',
  'Modest · Elegant · You',
  '🦋',
];

function MarqueeRow({ reverse = false, speed = 30 }) {
  const doubled = [...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        animate={{ x: reverse ? ['0%', '33.33%'] : ['0%', '-33.33%'] }}
        transition={{ repeat: Infinity, duration: speed, ease: 'linear' }}
        className="inline-flex items-center gap-8 py-3"
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`text-[11px] font-sans tracking-[0.28em] uppercase shrink-0 ${
              item === '🦋' ? 'text-base leading-none' : 'text-current'
            }`}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Marquee({ dark = false }) {
  return (
    <div className={`py-1 border-y overflow-hidden select-none ${dark ? 'bg-[#0D0D0D] border-white/10 text-white/40' : 'bg-[#FAF8F5] border-gray-100 text-ezme-taupe'}`}>
      <MarqueeRow speed={28} />
    </div>
  );
}
