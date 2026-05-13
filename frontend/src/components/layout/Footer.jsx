import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-ezme-black text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-serif text-3xl font-light mb-1">Join the <span className="logo-script text-3xl">Ezme</span> Circle 🦋</h3>
            <p className="text-white/40 text-xs font-sans tracking-wide">Early access to drops, exclusive offers, style inspo.</p>
          </div>
          <form className="flex w-full md:w-auto" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Your email"
              className="flex-1 md:w-64 bg-white/5 border border-white/10 px-5 py-3.5 text-sm font-sans text-white placeholder-white/30 outline-none focus:border-white/30 transition-colors" />
            <button type="submit" className="btn-dark px-6 text-xs whitespace-nowrap border-l-0">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <span className="logo-script text-4xl text-white block mb-1">Ezme 🦋</span>
          <p className="text-white/40 text-xs font-sans mb-4">Luxury Abayas · Made in Kenya</p>
          <p className="text-white/40 text-xs font-sans leading-relaxed">Handcrafted in Nairobi for the modern Muslim woman. Modest. Beautiful. Confident.</p>
        </div>

        <div>
          <h4 className="eyebrow text-white/40 mb-5">Shop</h4>
          <ul className="space-y-3">
            {[['New Arrivals','/shop?filter=new'],['Best Sellers','/shop?filter=bestseller'],['Everyday Abayas','/shop?category=everyday'],['Occasion Wear','/shop?category=occasion'],['All Pieces','/shop']].map(([l,t]) => (
              <li key={l}><Link to={t} className="text-sm text-white/50 hover:text-white transition-colors font-sans">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="eyebrow text-white/40 mb-5">Help</h4>
          <ul className="space-y-3">
            {['Size Guide','Shipping Info','Returns','Care Instructions','FAQ'].map(l => (
              <li key={l}><a href="#" className="text-sm text-white/50 hover:text-white transition-colors font-sans">{l}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="eyebrow text-white/40 mb-5">Contact</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-sm text-white/50 font-sans">
              <Phone size={13} className="mt-0.5 shrink-0 text-ezme-lavender" />
              <a href="https://wa.me/254799932131" className="hover:text-white transition-colors">+254 799 932 131</a>
            </li>
            <li className="flex items-start gap-3 text-sm text-white/50 font-sans">
              <Mail size={13} className="mt-0.5 shrink-0 text-ezme-lavender" />
              <a href="mailto:hello@ezme.ke" className="hover:text-white transition-colors">hello@ezme.ke</a>
            </li>
            <li className="flex items-start gap-3 text-sm text-white/50 font-sans">
              <MapPin size={13} className="mt-0.5 shrink-0 text-ezme-lavender" />
              <span>Nairobi, Kenya</span>
            </li>
          </ul>
          <div className="mt-6 p-4 border border-white/10 rounded-lg">
            <p className="text-[10px] text-white/30 font-sans mb-1 uppercase tracking-wider">M-PESA Till</p>
            <p className="text-sm text-white font-sans font-medium">123456</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/20 font-sans">© {new Date().getFullYear()} Ezme. All rights reserved.</p>
          <a href="https://www.instagram.com/ezme.ke" target="_blank" rel="noopener noreferrer"
            className="text-xs text-white/30 hover:text-white font-sans transition-colors logo-script text-sm">
            @ezme.ke 🦋
          </a>
        </div>
      </div>
    </footer>
  );
}
