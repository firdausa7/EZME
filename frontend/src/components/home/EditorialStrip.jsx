import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const STATS = [
  { num: '2,000+', label: 'Happy Customers' },
  { num: '18', label: 'Unique Designs' },
  { num: '100%', label: 'Made in Kenya' },
  { num: '5★', label: 'Rated by Clients' },
];

export default function EditorialStrip() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const textX = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);
  const revTextX = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section ref={ref} className="bg-[#0D0D0D] py-24 md:py-36 overflow-hidden relative">

      {/* Sliding headline rows */}
      <div className="mb-12 md:mb-16 space-y-2 overflow-hidden">
        <motion.div style={{ x: textX }} className="whitespace-nowrap">
          <span className="font-serif font-light text-white/[0.06] select-none"
            style={{ fontSize: 'clamp(64px, 11vw, 140px)', letterSpacing: '-0.02em' }}>
            LUXURY ABAYAS · NAIROBI · KENYA · MODEST FASHION ·&nbsp;
          </span>
        </motion.div>
        <motion.div style={{ x: revTextX }} className="whitespace-nowrap">
          <span className="font-serif font-light text-white/[0.06] select-none"
            style={{ fontSize: 'clamp(64px, 11vw, 140px)', letterSpacing: '-0.02em' }}>
            &nbsp;· @EZME.KE · HANDCRAFTED · WOMEN'S FASHION · ABAYAS
          </span>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left — statement text */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-white/30 text-[9px] font-sans tracking-[0.38em] uppercase mb-6 flex items-center gap-3"
            >
              <span className="w-5 h-px bg-white/20" /> The Ezme Story
            </motion.p>

            <div className="overflow-hidden mb-6">
              <motion.h2
                initial={{ y: '100%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                className="font-serif font-light text-white leading-[1.05]"
                style={{ fontSize: 'clamp(38px, 6vw, 76px)', letterSpacing: '-0.02em' }}
              >
                Born in Nairobi.
                <br />
                <em>Worn everywhere.</em>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-white/40 font-sans text-sm leading-relaxed max-w-sm mb-10"
            >
              Ezme was built on the belief that modest fashion is an art form. Every abaya is cut by hand, finished with care, and designed to make you feel extraordinary every single day.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Link to="/about"
                className="group inline-flex items-center gap-4 text-[10px] font-sans tracking-[0.25em] uppercase text-white/60 hover:text-white transition-colors duration-300"
              >
                Our Story
                <span className="w-8 h-px bg-white/30 group-hover:bg-white group-hover:w-14 transition-all duration-500" />
              </Link>
            </motion.div>
          </div>

          {/* Right — stats grid */}
          <div className="grid grid-cols-2 gap-px bg-white/[0.06]">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-[#0D0D0D] p-8 md:p-10"
              >
                <p className="font-serif font-light text-white mb-2"
                  style={{ fontSize: 'clamp(36px, 5vw, 56px)', letterSpacing: '-0.02em' }}>
                  {s.num}
                </p>
                <p className="text-white/30 text-[10px] font-sans tracking-[0.22em] uppercase">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom horizontal rule with label */}
      <div className="max-w-7xl mx-auto px-6 mt-20 flex items-center gap-6">
        <div className="flex-1 h-px bg-white/[0.07]" />
        <span className="text-white/20 text-[9px] font-sans tracking-[0.3em] uppercase shrink-0">Ezme · Est. Nairobi</span>
        <div className="flex-1 h-px bg-white/[0.07]" />
      </div>
    </section>
  );
}
