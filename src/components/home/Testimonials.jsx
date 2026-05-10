import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials } from '../../data/products';

export default function Testimonials() {
  const [cur, setCur] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCur(c => (c + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="eyebrow mb-3">Loved by Many</p>
          <h2 className="section-heading mb-4">What Our Girls Say</h2>
          <span className="divider" />
        </motion.div>

        <div className="mt-14 min-h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={cur}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="flex justify-center gap-0.5 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-ezme-lavender text-lg">★</span>
                ))}
              </div>
              <blockquote className="font-serif text-2xl md:text-3xl font-light text-ezme-black leading-relaxed italic mb-6">
                "{testimonials[cur].review}"
              </blockquote>
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-full bg-ezme-blush flex items-center justify-center mb-2">
                  <span className="font-serif text-ezme-black font-medium text-sm">{testimonials[cur].avatar}</span>
                </div>
                <p className="font-sans font-medium text-ezme-black text-sm">{testimonials[cur].name}</p>
                <p className="font-sans text-ezme-taupe text-xs">{testimonials[cur].location}</p>
                <p className="logo-script text-ezme-taupe text-sm mt-1">{testimonials[cur].product}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setCur(i)}
              className={`rounded-full transition-all duration-300 ${i === cur ? 'w-6 h-2 bg-ezme-black' : 'w-2 h-2 bg-gray-200'}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
