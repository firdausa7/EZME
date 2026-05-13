import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { useAdminAuth } from '../store/adminStore';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    await new Promise(r => setTimeout(r, 600));
    const res = await login(form.email, form.password);
    if (res.ok) navigate('/admin');
    else { setError(res.error); setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-4">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, #C9B8E8 0%, transparent 50%), radial-gradient(circle at 75% 75%, #E8B4B8 0%, transparent 50%)' }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm relative"
      >
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Top accent */}
          <div className="h-1 bg-gradient-to-r from-[#C9B8E8] via-[#E8B4B8] to-[#C9B8E8]" />

          <div className="p-8">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-1.5 mb-2">
                <span className="logo-script text-3xl text-[#0D0D0D]">Ezme</span>
                <span className="text-2xl">🦋</span>
              </div>
              <p className="text-xs font-sans text-gray-400 tracking-widest uppercase" style={{ letterSpacing: '0.18em' }}>
                Admin Dashboard
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-sans text-gray-500 uppercase tracking-widest mb-1.5" style={{ letterSpacing: '0.14em' }}>
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="admin@ezme.ke"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm font-sans text-gray-800 outline-none focus:border-[#C9B8E8] focus:ring-2 focus:ring-[#C9B8E8]/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-sans text-gray-500 uppercase tracking-widest mb-1.5" style={{ letterSpacing: '0.14em' }}>
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={form.password}
                    onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                    placeholder="••••••••"
                    required
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 pr-11 text-sm font-sans text-gray-800 outline-none focus:border-[#C9B8E8] focus:ring-2 focus:ring-[#C9B8E8]/20 transition-all"
                  />
                  <button type="button" onClick={() => setShowPw(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-xs text-red-500 font-sans bg-red-50 px-3 py-2 rounded-lg">
                  {error}
                </motion.p>
              )}

              <button type="submit" disabled={loading}
                className="w-full bg-[#0D0D0D] text-white rounded-lg py-3.5 text-xs font-sans tracking-widest uppercase transition-all hover:bg-gray-800 disabled:opacity-60 flex items-center justify-center gap-2"
                style={{ letterSpacing: '0.14em' }}>
                {loading
                  ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</>
                  : <><Lock size={13} /> Sign In</>}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-gray-100 space-y-1.5">
              <p className="text-[10px] text-gray-400 font-sans text-center">Demo credentials</p>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { label: 'Super Admin', email: 'admin@ezme.ke', pw: 'ezme2025' },
                ].map(c => (
                  <button key={c.label} onClick={() => setForm({ email: c.email, password: c.pw })}
                    className="text-[10px] font-sans text-gray-500 hover:text-gray-800 border border-gray-100 hover:border-gray-200 rounded-lg px-2 py-2 transition-all text-left">
                    <p className="font-medium">{c.label}</p>
                    <p className="text-gray-400">{c.email}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-white/20 text-xs font-sans mt-6">
          © {new Date().getFullYear()} Ezme 🦋 — Admin System
        </p>
      </motion.div>
    </div>
  );
}
