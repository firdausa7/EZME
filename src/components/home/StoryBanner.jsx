import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function StoryBanner() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <section ref={ref} className="grid md:grid-cols-2 min-h-[580px]">
      {/* Video side */}
      <div className="relative overflow-hidden bg-ezme-mist">
        <motion.video
          style={{ scale, minHeight: 400 }}
          src="/videos/reel7.mp4"
          autoPlay muted loop playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Text side */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="flex items-center bg-white px-8 md:px-16 py-16"
      >
        <div className="max-w-sm">
          <p className="eyebrow mb-4">Our Story</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-ezme-black mb-6 leading-tight">
            Made with Love<br />in <span className="logo-script text-4xl md:text-5xl">Nairobi</span>
          </h2>
          <p className="text-sm font-sans text-ezme-taupe leading-relaxed mb-5">
            Ezme was born from a simple belief — that modest fashion should never compromise on beauty. Every abaya is designed and crafted in Kenya for the confident, modern Muslim woman.
          </p>
          <p className="text-sm font-sans text-ezme-taupe leading-relaxed mb-8">
            From our signature classic cuts to bold statement pieces, each design is a celebration of faith, identity, and quiet elegance.
          </p>

          <div className="flex gap-8 mb-8">
            {[{ n: '2,000+', l: 'Happy Customers' }, { n: '7+', l: 'Unique Designs' }, { n: '100%', l: 'Made in Kenya' }].map(s => (
              <div key={s.l}>
                <p className="logo-script text-3xl text-ezme-black">{s.n}</p>
                <p className="text-[10px] font-sans text-ezme-taupe mt-0.5 tracking-wide uppercase" style={{ letterSpacing: '0.1em' }}>{s.l}</p>
              </div>
            ))}
          </div>

          <Link to="/about" className="btn-outline px-8 py-3.5 text-xs">Our Story</Link>
        </div>
      </motion.div>
    </section>
  );
}
