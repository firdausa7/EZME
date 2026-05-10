import { useState } from 'react';
import {
  Settings, Save, CheckCircle, CreditCard, Truck,
  Globe, Shield, Bell, Info
} from 'lucide-react';
import { useAdminStore, useAdminAuth } from '../store/adminStore';
import toast from 'react-hot-toast';

function SectionCard({ title, icon: Icon, children }) {
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

function Field({ label, value, onChange, type = 'text', prefix, note }) {
  return (
    <div>
      <label className="block text-[10px] font-sans text-gray-400 uppercase tracking-widest mb-1.5">{label}</label>
      <div className="relative flex items-center">
        {prefix && <span className="absolute left-3 text-xs font-sans text-gray-400">{prefix}</span>}
        <input type={type} value={value} onChange={e => onChange(e.target.value)}
          className={`w-full border border-gray-200 rounded-lg py-2.5 text-sm font-sans outline-none focus:border-[#C9B8E8] focus:ring-2 focus:ring-[#C9B8E8]/20 ${prefix ? 'pl-9 pr-4' : 'px-3'}`} />
      </div>
      {note && <p className="text-[10px] font-sans text-gray-400 mt-1">{note}</p>}
    </div>
  );
}

const COUNTIES = ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Nyeri', 'Garissa', 'Malindi', 'Kitale'];

export default function AdminSettings() {
  const { settings, updateSettings } = useAdminStore();
  const { user } = useAdminAuth();
  const [form, setForm] = useState({ ...settings });
  const [savedSection, setSavedSection] = useState('');
  const [selectedCounties, setSelectedCounties] = useState(settings.counties || []);

  const isSuperAdmin = user?.role === 'super_admin';

  const save = (section) => {
    updateSettings({ ...form, counties: selectedCounties });
    setSavedSection(section);
    toast.success('Settings saved');
    setTimeout(() => setSavedSection(''), 2000);
  };

  const SaveButton = ({ section }) => (
    <button onClick={() => save(section)} disabled={!isSuperAdmin}
      className={`flex items-center gap-1.5 text-[11px] font-sans px-4 py-2 rounded-lg transition-colors mt-4
        ${isSuperAdmin ? 'btn-dark' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
      {savedSection === section ? <><CheckCircle size={12} /> Saved!</> : <><Save size={12} /> Save</>}
    </button>
  );

  if (!isSuperAdmin) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Shield size={40} className="text-gray-200 mb-4" />
        <p className="text-sm font-sans text-gray-500">Settings are only accessible to super admins.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl font-light text-gray-900">Settings</h1>
        <p className="text-xs font-sans text-gray-500 mt-0.5">Store configuration and preferences</p>
      </div>

      {/* General */}
      <SectionCard title="General" icon={Globe}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-sans text-gray-400 uppercase tracking-widest mb-1.5">Currency</label>
            <select value={form.currency} onChange={e => setForm(f => ({ ...f, currency: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-sans outline-none focus:border-[#C9B8E8]">
              {['KES', 'USD', 'GBP'].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <Field label="Return Policy" value={form.returnPolicy} onChange={v => setForm(f => ({ ...f, returnPolicy: v }))} />
          <Field label="Store Hours" value={form.storeHours} onChange={v => setForm(f => ({ ...f, storeHours: v }))} />
          <div>
            <label className="block text-[10px] font-sans text-gray-400 uppercase tracking-widest mb-1.5">VAT (%)</label>
            <input type="number" value={form.vat} onChange={e => setForm(f => ({ ...f, vat: Number(e.target.value) }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-sans outline-none focus:border-[#C9B8E8]" />
          </div>
        </div>
        <SaveButton section="general" />
      </SectionCard>

      {/* Delivery & Shipping */}
      <SectionCard title="Delivery & Shipping" icon={Truck}>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Standard Delivery Fee (KES)" value={form.deliveryFee}
            onChange={v => setForm(f => ({ ...f, deliveryFee: Number(v) }))} type="number" />
          <Field label="Free Delivery Threshold (KES)" value={form.freeDeliveryThreshold}
            onChange={v => setForm(f => ({ ...f, freeDeliveryThreshold: Number(v) }))} type="number"
            note="Free delivery on orders above this amount" />
          <Field label="Nairobi Delivery Fee (KES)" value={form.nairobi_fee}
            onChange={v => setForm(f => ({ ...f, nairobi_fee: Number(v) }))} type="number"
            note="0 = free for Nairobi" />
        </div>

        <div className="mt-4">
          <label className="block text-[10px] font-sans text-gray-400 uppercase tracking-widest mb-2">Active Delivery Zones</label>
          <div className="flex flex-wrap gap-2">
            {COUNTIES.map(c => (
              <button key={c}
                onClick={() => setSelectedCounties(cs => cs.includes(c) ? cs.filter(x => x !== c) : [...cs, c])}
                className={`text-xs font-sans px-3 py-1.5 rounded-lg border transition-colors ${
                  selectedCounties.includes(c)
                    ? 'bg-[#0D0D0D] text-white border-[#0D0D0D]'
                    : 'border-gray-200 text-gray-500 hover:border-gray-300'
                }`}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <SaveButton section="delivery" />
      </SectionCard>

      {/* Payments */}
      <SectionCard title="M-PESA Payments" icon={CreditCard}>
        <div className="grid grid-cols-2 gap-4">
          <Field label="M-PESA Till Number" value={form.mpesaTill}
            onChange={v => setForm(f => ({ ...f, mpesaTill: v }))} />
          <Field label="Account Name" value={form.mpesaName}
            onChange={v => setForm(f => ({ ...f, mpesaName: v }))} />
        </div>
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl">
          <div className="flex items-start gap-2">
            <Info size={13} className="text-green-600 mt-0.5 shrink-0" />
            <p className="text-[11px] font-sans text-green-700">
              For M-PESA STK Push (automatic payment prompt), integrate the Daraja API. Contact your developer to set up the backend endpoint with your consumer key and secret.
            </p>
          </div>
        </div>
        <SaveButton section="payments" />
      </SectionCard>

      {/* Notifications */}
      <SectionCard title="Notification Preferences" icon={Bell}>
        <div className="space-y-3">
          {[
            { label: 'New order notifications', key: 'notifOrders', enabled: true },
            { label: 'Payment confirmations', key: 'notifPayments', enabled: true },
            { label: 'Low stock alerts', key: 'notifStock', enabled: true },
            { label: 'WhatsApp inquiries', key: 'notifWhatsApp', enabled: true },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <span className="text-xs font-sans text-gray-700">{item.label}</span>
              <div className="relative">
                <input type="checkbox" defaultChecked={item.enabled}
                  className="sr-only peer" id={item.key} />
                <label htmlFor={item.key}
                  className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-[#C9B8E8] after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5 cursor-pointer block" />
              </div>
            </div>
          ))}
        </div>
        <SaveButton section="notifications" />
      </SectionCard>

      {/* Admin accounts */}
      <SectionCard title="Admin Accounts" icon={Shield}>
        <div className="space-y-2">
          {[
            { name: 'Ezme Admin', email: 'admin@ezme.ke', role: 'Super Admin' },
            { name: 'Staff User', email: 'staff@ezme.ke', role: 'Staff' },
          ].map(acc => (
            <div key={acc.email} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#C9B8E8]/20 flex items-center justify-center">
                  <span className="text-xs font-sans text-[#7a6b9a] font-medium">
                    {acc.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-sans font-medium text-gray-800">{acc.name}</p>
                  <p className="text-[10px] text-gray-400 font-sans">{acc.email}</p>
                </div>
              </div>
              <span className={`text-[10px] font-sans px-2 py-0.5 rounded-full ${
                acc.role === 'Super Admin' ? 'bg-[#0D0D0D] text-white' : 'bg-gray-100 text-gray-600'
              }`}>{acc.role}</span>
            </div>
          ))}
        </div>
        <p className="text-[10px] font-sans text-gray-400 mt-3">To add or remove admin accounts, update the ADMIN_USERS array in the codebase.</p>
      </SectionCard>
    </div>
  );
}
