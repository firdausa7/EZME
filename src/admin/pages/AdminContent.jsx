import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Edit2, Save, X, Image, Type, Link2,
  Eye, EyeOff, CheckCircle, Palette
} from 'lucide-react';
import { useAdminStore } from '../store/adminStore';
import toast from 'react-hot-toast';

function SectionCard({ title, children, icon: Icon }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden">
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-50">
        <Icon size={15} className="text-[#C9B8E8]" />
        <h3 className="font-serif text-base font-light text-gray-900">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Field({ label, value, onChange, multiline, type = 'text' }) {
  return (
    <div>
      <label className="block text-[10px] font-sans text-gray-400 uppercase tracking-widest mb-1.5">{label}</label>
      {multiline ? (
        <textarea rows={3} value={value} onChange={e => onChange(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-sans outline-none focus:border-[#C9B8E8] focus:ring-2 focus:ring-[#C9B8E8]/20 resize-none" />
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-sans outline-none focus:border-[#C9B8E8] focus:ring-2 focus:ring-[#C9B8E8]/20" />
      )}
    </div>
  );
}

export default function AdminContent() {
  const { content, updateContent } = useAdminStore();
  const [saved, setSaved] = useState({});

  const [hero, setHero] = useState(content.hero || {});
  const [about, setAbout] = useState(content.about || {});
  const [announcement, setAnnouncement] = useState(content.announcement || {});
  const [contact, setContact] = useState(content.contact || {});

  const save = (section, data) => {
    updateContent(section, data);
    setSaved(s => ({ ...s, [section]: true }));
    toast.success(`${section.charAt(0).toUpperCase() + section.slice(1)} section saved`);
    setTimeout(() => setSaved(s => ({ ...s, [section]: false })), 2000);
  };

  const VIDEO_OPTIONS = ['reel1.mp4', 'reel2.mp4', 'reel3.mp4', 'reel4.mp4', 'reel5.mp4', 'reel6.mp4', 'reel7.mp4'];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl font-light text-gray-900">Content</h1>
        <p className="text-xs font-sans text-gray-500 mt-0.5">Manage website content and copy</p>
      </div>

      {/* Announcement Banner */}
      <SectionCard title="Announcement Banner" icon={Type}>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setAnnouncement(a => ({ ...a, active: !a.active }))}
              className={`flex items-center gap-2 text-xs font-sans px-3 py-1.5 rounded-lg border transition-colors ${
                announcement.active ? 'bg-green-50 border-green-200 text-green-700' : 'border-gray-200 text-gray-500'
              }`}>
              {announcement.active ? <><Eye size={12} /> Visible</> : <><EyeOff size={12} /> Hidden</>}
            </button>
            <span className="text-[10px] font-sans text-gray-400">Toggle banner visibility</span>
          </div>
          <Field label="Banner Text" value={announcement.text || ''}
            onChange={v => setAnnouncement(a => ({ ...a, text: v }))} />
          <button onClick={() => save('announcement', announcement)}
            className="btn-dark px-4 py-2 text-[11px] rounded-lg flex items-center gap-1.5">
            {saved.announcement ? <><CheckCircle size={12} /> Saved!</> : <><Save size={12} /> Save Banner</>}
          </button>
        </div>
      </SectionCard>

      {/* Hero Section */}
      <SectionCard title="Hero Section" icon={Image}>
        <div className="grid lg:grid-cols-2 gap-5">
          <div className="space-y-4">
            <Field label="Headline" value={hero.title || ''}
              onChange={v => setHero(h => ({ ...h, title: v }))} />
            <Field label="Subtitle" value={hero.subtitle || ''}
              onChange={v => setHero(h => ({ ...h, subtitle: v }))} />
            <Field label="CTA Button Text" value={hero.cta || ''}
              onChange={v => setHero(h => ({ ...h, cta: v }))} />
            <div>
              <label className="block text-[10px] font-sans text-gray-400 uppercase tracking-widest mb-1.5">Background Video</label>
              <select value={hero.video || ''}
                onChange={e => setHero(h => ({ ...h, video: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-sans outline-none focus:border-[#C9B8E8]">
                {VIDEO_OPTIONS.map(v => <option key={v}>{v}</option>)}
              </select>
            </div>
            <button onClick={() => save('hero', hero)}
              className="btn-dark px-4 py-2 text-[11px] rounded-lg flex items-center gap-1.5">
              {saved.hero ? <><CheckCircle size={12} /> Saved!</> : <><Save size={12} /> Save Hero</>}
            </button>
          </div>

          {/* Preview */}
          <div className="relative rounded-xl overflow-hidden bg-gray-900 aspect-video">
            <video src={`/videos/${hero.video}`} autoPlay muted loop playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
              <p className="text-[10px] font-sans tracking-widest uppercase text-white/60 mb-2">{hero.subtitle}</p>
              <p className="font-serif text-xl font-light">{hero.title}</p>
              <button className="mt-3 bg-white text-gray-900 text-[10px] font-sans px-4 py-1.5 rounded-full">{hero.cta}</button>
            </div>
            <div className="absolute bottom-2 right-2 bg-black/40 text-white text-[9px] font-sans px-2 py-0.5 rounded">Preview</div>
          </div>
        </div>
      </SectionCard>

      {/* About Section */}
      <SectionCard title="About Section" icon={Type}>
        <div className="space-y-4">
          <Field label="Heading" value={about.heading || ''}
            onChange={v => setAbout(a => ({ ...a, heading: v }))} />
          <Field label="Body Text" value={about.body || ''}
            onChange={v => setAbout(a => ({ ...a, body: v }))} multiline />
          <button onClick={() => save('about', about)}
            className="btn-dark px-4 py-2 text-[11px] rounded-lg flex items-center gap-1.5">
            {saved.about ? <><CheckCircle size={12} /> Saved!</> : <><Save size={12} /> Save About</>}
          </button>
        </div>
      </SectionCard>

      {/* Contact & Store Info */}
      <SectionCard title="Contact & Store Info" icon={Link2}>
        <div className="grid lg:grid-cols-2 gap-4">
          <Field label="Phone Number" value={contact.phone || ''}
            onChange={v => setContact(c => ({ ...c, phone: v }))} />
          <Field label="Email" value={contact.email || ''} type="email"
            onChange={v => setContact(c => ({ ...c, email: v }))} />
          <Field label="Instagram Handle" value={contact.instagram || ''}
            onChange={v => setContact(c => ({ ...c, instagram: v }))} />
          <Field label="M-PESA Till Number" value={contact.mpesa || ''}
            onChange={v => setContact(c => ({ ...c, mpesa: v }))} />
        </div>
        <button onClick={() => save('contact', contact)}
          className="btn-dark px-4 py-2 text-[11px] rounded-lg flex items-center gap-1.5 mt-4">
          {saved.contact ? <><CheckCircle size={12} /> Saved!</> : <><Save size={12} /> Save Contact Info</>}
        </button>
      </SectionCard>

      {/* Brand Colors */}
      <SectionCard title="Brand Colors" icon={Palette}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { name: 'Ezme Black', hex: '#0D0D0D', label: 'Primary' },
            { name: 'Lavender', hex: '#C9B8E8', label: 'Accent' },
            { name: 'Blush', hex: '#E8B4B8', label: 'Secondary' },
            { name: 'Cream', hex: '#FAF8F5', label: 'Background' },
          ].map(c => (
            <div key={c.name} className="border border-gray-100 rounded-xl p-3 text-center">
              <div className="w-full h-12 rounded-lg mb-2.5" style={{ background: c.hex }} />
              <p className="text-xs font-sans font-medium text-gray-800">{c.name}</p>
              <p className="text-[10px] text-gray-400 font-mono mt-0.5">{c.hex}</p>
              <span className="text-[9px] font-sans text-gray-400">{c.label}</span>
            </div>
          ))}
        </div>
        <p className="text-[10px] font-sans text-gray-400 mt-3">Brand colors are defined in the design system. Contact a developer to update.</p>
      </SectionCard>
    </div>
  );
}
