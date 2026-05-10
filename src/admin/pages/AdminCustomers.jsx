import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Users, MessageCircle, ShoppingBag, Ban,
  CheckCircle, ChevronDown, X, Eye
} from 'lucide-react';
import { useAdminStore } from '../store/adminStore';
import toast from 'react-hot-toast';

function CustomerAvatar({ name }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2);
  const colors = ['bg-[#C9B8E8]', 'bg-[#E8B4B8]', 'bg-[#B0C4DE]', 'bg-[#D4E8C9]', 'bg-[#E8D4B4]'];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center shrink-0`}>
      <span className="text-xs font-sans text-white font-medium">{initials}</span>
    </div>
  );
}

function CustomerDrawer({ customer, orders, onClose, onSuspend }) {
  const customerOrders = orders.filter(o => o.customer.email === customer.email);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex justify-end"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.28 }}
        className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-serif text-lg font-light text-gray-900">Customer Profile</h2>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100">
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Profile */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-[#C9B8E8]/20 flex items-center justify-center shrink-0">
                <span className="font-serif text-xl text-[#7a6b9a]">
                  {customer.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-base font-sans font-medium text-gray-900">{customer.name}</p>
                <p className="text-xs text-gray-500 font-sans">{customer.email}</p>
                <p className="text-xs text-gray-500 font-sans">{customer.phone}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-[10px] font-sans px-2 py-0.5 rounded-full ${
                    customer.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                  }`}>
                    {customer.status}
                  </span>
                  <span className="text-[10px] font-sans text-gray-400">{customer.county}</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Orders', value: customer.orders },
                { label: 'Total Spent', value: `KES ${customer.totalSpent.toLocaleString()}` },
                { label: 'Member Since', value: customer.joinDate.slice(0, 7) },
              ].map(s => (
                <div key={s.label} className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="font-serif text-lg font-light text-gray-900">{s.value}</p>
                  <p className="text-[10px] font-sans text-gray-400 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Order history */}
            <div>
              <h4 className="text-[10px] font-sans text-gray-400 uppercase tracking-wider mb-3">Order History</h4>
              {customerOrders.length === 0 ? (
                <p className="text-xs font-sans text-gray-400">No orders in mock data for this customer.</p>
              ) : (
                <div className="space-y-2">
                  {customerOrders.map(o => (
                    <div key={o.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <img src={o.product.thumbnail} alt="" className="w-9 h-11 object-cover rounded-lg shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-sans font-medium text-gray-900 truncate">{o.product.name}</p>
                        <p className="text-[10px] text-gray-400 font-sans">{o.id} · {o.date}</p>
                      </div>
                      <p className="text-xs font-sans text-gray-700 shrink-0">KES {o.amount.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-4 border-t border-gray-100">
          <a href={`https://wa.me/${customer.phone.replace(/^0/, '254')}`}
            target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white text-xs font-sans py-2.5 rounded-lg hover:bg-[#1ebe5d] transition-colors">
            <MessageCircle size={13} /> WhatsApp
          </a>
          <button onClick={() => onSuspend(customer.id)}
            className={`flex-1 flex items-center justify-center gap-2 text-xs font-sans py-2.5 rounded-lg border transition-colors ${
              customer.status === 'active'
                ? 'border-red-200 text-red-600 hover:bg-red-50'
                : 'border-green-200 text-green-600 hover:bg-green-50'
            }`}>
            {customer.status === 'active' ? <><Ban size={13} /> Suspend</> : <><CheckCircle size={13} /> Activate</>}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AdminCustomers() {
  const { customers, orders, updateCustomer } = useAdminStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const filtered = customers.filter(c => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.phone.includes(q);
    }
    return true;
  }).sort((a, b) => b.totalSpent - a.totalSpent);

  const handleSuspend = (id) => {
    const customer = customers.find(c => c.id === id);
    const newStatus = customer.status === 'active' ? 'suspended' : 'active';
    updateCustomer(id, { status: newStatus });
    toast.success(`Customer ${newStatus === 'active' ? 'activated' : 'suspended'}`);
  };

  const topCustomer = [...customers].sort((a, b) => b.totalSpent - a.totalSpent)[0];
  const totalRevenue = customers.reduce((s, c) => s + c.totalSpent, 0);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-light text-gray-900">Customers</h1>
          <p className="text-xs font-sans text-gray-500 mt-0.5">{customers.length} total · KES {totalRevenue.toLocaleString()} lifetime value</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Customers', value: customers.length },
          { label: 'Active', value: customers.filter(c => c.status === 'active').length },
          { label: 'Suspended', value: customers.filter(c => c.status === 'suspended').length },
          { label: 'Top Spender', value: topCustomer?.name.split(' ')[0] || '—', sub: `KES ${topCustomer?.totalSpent.toLocaleString()}` },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl shadow-sm border border-gray-50 p-4">
            <p className="font-serif text-2xl font-light text-gray-900">{s.value}</p>
            <p className="text-xs font-sans text-gray-500 mt-0.5">{s.label}</p>
            {s.sub && <p className="text-[10px] text-gray-400 font-sans">{s.sub}</p>}
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-50 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-48 relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, email, phone..."
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-xs font-sans outline-none focus:border-[#C9B8E8] focus:ring-2 focus:ring-[#C9B8E8]/20" />
          </div>
          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            {['all', 'active', 'suspended'].map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`text-[11px] font-sans px-3 py-2 capitalize transition-colors ${statusFilter === s ? 'bg-[#0D0D0D] text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Customer grid */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {['Customer', 'Contact', 'Location', 'Orders', 'Total Spent', 'Status', ''].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-sans font-medium text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(customer => (
                <tr key={customer.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <CustomerAvatar name={customer.name} />
                      <div>
                        <p className="text-xs font-sans font-medium text-gray-900">{customer.name}</p>
                        <p className="text-[10px] text-gray-400 font-sans">Since {customer.joinDate.slice(0, 7)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-xs font-sans text-gray-700">{customer.phone}</p>
                    <p className="text-[10px] text-gray-400 font-sans truncate max-w-[140px]">{customer.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-sans text-gray-600">{customer.county}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <ShoppingBag size={12} className="text-gray-400" />
                      <span className="text-xs font-sans text-gray-700">{customer.orders}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-sans font-medium text-gray-900">KES {customer.totalSpent.toLocaleString()}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-sans px-2 py-0.5 rounded-full ${
                      customer.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                    }`}>{customer.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => setSelected(customer)}
                        className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                        <Eye size={13} />
                      </button>
                      <a href={`https://wa.me/${customer.phone.replace(/^0/, '254')}`}
                        target="_blank" rel="noopener noreferrer"
                        className="p-1.5 text-[#25D366] hover:bg-green-50 rounded-lg transition-colors">
                        <MessageCircle size={13} />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <Users size={32} className="text-gray-200 mx-auto mb-3" />
              <p className="text-sm font-sans text-gray-400">No customers found</p>
            </div>
          )}
        </div>
      </div>

      {/* Drawer */}
      <AnimatePresence>
        {selected && (
          <CustomerDrawer
            customer={selected}
            orders={orders}
            onClose={() => setSelected(null)}
            onSuspend={(id) => { handleSuspend(id); setSelected(null); }} />
        )}
      </AnimatePresence>
    </div>
  );
}
