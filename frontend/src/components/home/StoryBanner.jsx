import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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
        <div className="absolute inset-0 bg-black/15" />
      </div>

      {/* Text side */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="flex items-center bg-ezme-cream px-8 md:px-16 py-16"
      >
        <div className="max-w-sm">
          <p className="eyebrow mb-4">Our Story</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-ezme-black mb-6 leading-tight">
            Made with Love<br />in Nairobi
          </h2>
          <p className="text-sm font-sans text-ezme-taupe leading-relaxed mb-5">
            Ezme was born from a simple belief — that modest fashion should never compromise on beauty. Every abaya is designed and crafted in Kenya for the confident, modern Muslim woman.
          </p>
          <p className="text-sm font-sans text-ezme-taupe leading-relaxed mb-10">
            From our signature classic cuts to bold statement pieces, each design is a celebration of faith, identity, and quiet elegance.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
