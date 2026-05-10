import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <main className="pt-24 min-h-screen">
      {/* Hero */}
      <div className="relative h-80 md:h-[500px] overflow-hidden bg-ezme-black">
        <img
          src="https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=1800&q=85&auto=format&fit=crop"
          alt="About EZME"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-xs tracking-widest uppercase font-sans text-white/50 mb-4" style={{ letterSpacing: '0.25em' }}>Our Story</p>
            <h1 className="font-serif text-5xl md:text-7xl font-light text-white leading-tight">
              Born from<br />Love & Faith
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Story section */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-serif text-2xl md:text-3xl font-light text-ezme-black leading-relaxed italic">
            "We believe that modest fashion is not a limitation — it is an expression of identity, faith, and quiet power."
          </p>
          <div className="w-12 h-px bg-ezme-lavender mx-auto mt-6" />
          <p className="text-sm text-ezme-taupe font-sans mt-4">— EZME Founder</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs tracking-widest uppercase font-sans text-ezme-taupe mb-4" style={{ letterSpacing: '0.2em' }}>The Beginning</p>
            <h2 className="font-serif text-3xl font-light text-ezme-black mb-6">Crafted with Purpose, Worn with Pride</h2>
            <p className="text-ezme-taupe font-sans leading-relaxed mb-4 text-sm">
              EZME was born in the heart of Nairobi from a simple but powerful observation: that Muslim women in Kenya deserved luxury fashion that truly understood their needs. Not adaptations, not compromises — but fashion designed from the ground up with modesty as its foundation.
            </p>
            <p className="text-ezme-taupe font-sans leading-relaxed text-sm">
              Our founder — a modest fashion enthusiast with a background in design — set out to create abayas that could hold their own against the world's finest fashion houses. Pieces that were equally at home in a Nairobi boardroom, a coastal wedding, or a quiet Friday afternoon.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="aspect-square overflow-hidden bg-ezme-mist"
          >
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85&auto=format&fit=crop"
              alt="EZME craftsmanship"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div className="order-2 md:order-1 aspect-square overflow-hidden bg-ezme-mist">
            <img
              src="https://images.unsplash.com/photo-1597528380848-7ffd2f5b2ab7?w=800&q=85&auto=format&fit=crop"
              alt="EZME atelier"
              className="w-full h-full object-cover"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <p className="text-xs tracking-widest uppercase font-sans text-ezme-taupe mb-4" style={{ letterSpacing: '0.2em' }}>Our Craft</p>
            <h2 className="font-serif text-3xl font-light text-ezme-black mb-6">Made in Kenya, Made with Love</h2>
            <p className="text-ezme-taupe font-sans leading-relaxed mb-4 text-sm">
              Every EZME abaya is designed, cut, and finished in our Nairobi atelier by skilled local artisans. We source premium fabrics from trusted suppliers — from Italian crepe to Japanese chiffon — and pair them with locally-crafted embellishments.
            </p>
            <p className="text-ezme-taupe font-sans leading-relaxed text-sm">
              Our commitment to quality means that each piece undergoes rigorous quality checks before it reaches your hands. When you wear EZME, you wear the work of hands that care.
            </p>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 border-t border-b border-gray-100 py-12 mb-20">
          {[
            { num: '2,000+', label: 'Happy Customers' },
            { num: '50+', label: 'Unique Designs' },
            { num: '100%', label: 'Made in Kenya' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <p className="font-serif text-4xl font-light text-ezme-lavender mb-2">{s.num}</p>
              <p className="text-xs font-sans text-ezme-taupe tracking-wider uppercase" style={{ letterSpacing: '0.12em' }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div>
          <div className="section-title">
            <p>What We Stand For</p>
            <h2>Our Values</h2>
            <div className="gold-line" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '✦', title: 'Modesty is Luxury', body: 'We treat modest fashion with the same reverence that the world\'s great fashion houses give to couture. No detail is too small, no fabric too ordinary.' },
              { icon: '✦', title: 'Kenyan Excellence', body: 'Every piece is a celebration of Kenyan craftsmanship. We are proud to create luxury on home soil and to support our local artisan community.' },
              { icon: '✦', title: 'The Modern Woman', body: 'Our customer is dynamic, confident, and deeply principled. We design for her life — from the school run to the boardroom to the ballroom.' },
            ].map(v => (
              <div key={v.title} className="text-center">
                <span className="text-ezme-lavender text-2xl block mb-4">{v.icon}</span>
                <h3 className="font-serif text-xl font-light text-ezme-black mb-3">{v.title}</h3>
                <p className="text-sm text-ezme-taupe font-sans leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-ezme-cream py-20 text-center px-6">
        <h2 className="font-serif text-4xl md:text-5xl font-light text-ezme-black mb-4">Ready to Experience EZME?</h2>
        <p className="text-ezme-taupe font-sans text-sm mb-8 max-w-md mx-auto">Explore our collection and find the piece that speaks to you.</p>
        <div className="flex items-center justify-center gap-4">
          <Link to="/shop" className="btn-dark px-10 py-4 text-xs">Shop the Collection</Link>
          <a
            href="https://wa.me/254799932131"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline px-10 py-4 text-xs"
          >
            Chat with Us
          </a>
        </div>
      </div>
    </main>
  );
}
