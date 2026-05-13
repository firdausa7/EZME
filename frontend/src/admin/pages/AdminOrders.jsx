import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, Download, Eye, ChevronDown,
  ShoppingCart, MessageCircle, ArrowUpDown
} from 'lucide-react';
import { useAdminStore } from '../store/adminStore';
import { STATUS_COLORS, ORDER_STATUSES } from '../data/mockData';

const SORT_OPTIONS = [
  { label: 'Newest first', key: 'date', dir: -1 },
  { label: 'Oldest first', key: 'date', dir: 1 },
  { label: 'Highest amount', key: 'amount', dir: -1 },
  { label: 'Lowest amount', key: 'amount', dir: 1 },
];

function StatusBadge({ status }) {
  const s = STATUS_COLORS[status];
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-sans px-2.5 py-0.5 rounded-full ${s?.bg} ${s?.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s?.dot}`} />
      {status}
    </span>
  );
}

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useAdminStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortIdx, setSortIdx] = useState(0);
  const [showSort, setShowSort] = useState(false);
  const [selected, setSelected] = useState([]);
  const [bulkStatus, setBulkStatus] = useState('');

  const sort = SORT_OPTIONS[sortIdx];

  const filtered = orders
    .filter(o => {
      if (statusFilter !== 'All' && o.status !== statusFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return o.id.toLowerCase().includes(q) || o.customer.name.toLowerCase().includes(q) || o.product.name.toLowerCase().includes(q);
      }
      return true;
    })
    .sort((a, b) => {
      const av = sort.key === 'date' ? new Date(a.date) : a[sort.key];
      const bv = sort.key === 'date' ? new Date(b.date) : b[sort.key];
      return (av > bv ? 1 : -1) * sort.dir;
    });

  const allSelected = filtered.length > 0 && filtered.every(o => selected.includes(o.id));
  const toggleAll = () => setSelected(allSelected ? [] : filtered.map(o => o.id));
  const toggleOne = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const applyBulkStatus = () => {
    if (!bulkStatus) return;
    selected.forEach(id => updateOrderStatus(id, bulkStatus));
    setSelected([]);
    setBulkStatus('');
  };

  const exportCSV = () => {
    const rows = [
      ['Order ID', 'Customer', 'Product', 'Amount', 'Status', 'Date'],
      ...filtered.map(o => [o.id, o.customer.name, o.product.name, o.amount, o.status, o.date])
    ];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = 'ezme-orders.csv'; a.click();
  };

  const totalRevenue = orders.filter(o => o.status === 'Delivered').reduce((s, o) => s + o.amount, 0);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-light text-gray-900">Orders</h1>
          <p className="text-xs font-sans text-gray-500 mt-0.5">{orders.length} total · KES {totalRevenue.toLocaleString()} delivered revenue</p>
        </div>
        <button onClick={exportCSV}
          className="flex items-center gap-1.5 text-xs font-sans text-gray-600 border border-gray-200 px-3 py-2 rounded-lg hover:border-gray-300 transition-colors">
          <Download size={13} /> Export CSV
        </button>
      </div>

      {/* Status pills */}
      <div className="flex flex-wrap gap-2">
        {['All', ...ORDER_STATUSES].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={`text-[11px] font-sans px-3 py-1.5 rounded-lg border transition-colors ${statusFilter === s ? 'bg-[#0D0D0D] text-white border-[#0D0D0D]' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
            {s}
            {s !== 'All' && <span className="ml-1.5 opacity-60">{orders.filter(o => o.status === s).length}</span>}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-50 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-48 relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search orders, customers, products..."
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-xs font-sans outline-none focus:border-[#C9B8E8] focus:ring-2 focus:ring-[#C9B8E8]/20" />
          </div>

          <div className="relative">
            <button onClick={() => setShowSort(s => !s)}
              className="flex items-center gap-2 text-xs font-sans text-gray-600 border border-gray-200 px-3 py-2.5 rounded-lg hover:border-gray-300">
              <ArrowUpDown size={13} /> {sort.label} <ChevronDown size={12} />
            </button>
            {showSort && (
              <div className="absolute right-0 top-10 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 w-44 z-10">
                {SORT_OPTIONS.map((s, i) => (
                  <button key={i} onClick={() => { setSortIdx(i); setShowSort(false); }}
                    className={`w-full text-left px-3 py-2 text-xs font-sans transition-colors ${sortIdx === i ? 'text-gray-900 bg-gray-50' : 'text-gray-600 hover:bg-gray-50'}`}>
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bulk actions */}
        {selected.length > 0 && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100">
            <span className="text-xs font-sans text-gray-600 font-medium">{selected.length} selected</span>
            <select value={bulkStatus} onChange={e => setBulkStatus(e.target.value)}
              className="border border-gray-200 rounded-lg px-2 py-1.5 text-xs font-sans outline-none focus:border-[#C9B8E8]">
              <option value="">Change status…</option>
              {ORDER_STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
            <button onClick={applyBulkStatus} disabled={!bulkStatus}
              className="text-xs font-sans bg-[#0D0D0D] text-white px-3 py-1.5 rounded-lg disabled:opacity-40 hover:bg-gray-800 transition-colors">
              Apply
            </button>
            <button onClick={() => setSelected([])} className="ml-auto text-xs font-sans text-gray-400 hover:text-gray-600">
              Clear
            </button>
          </motion.div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-4 py-3">
                  <input type="checkbox" checked={allSelected} onChange={toggleAll}
                    className="rounded border-gray-300 text-[#0D0D0D]" />
                </th>
                {['Order ID', 'Customer', 'Product', 'Amount', 'Status', 'Date', ''].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-sans font-medium text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filtered.map(order => (
                  <motion.tr key={order.id} layout
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <input type="checkbox" checked={selected.includes(order.id)} onChange={() => toggleOne(order.id)}
                        className="rounded border-gray-300 text-[#0D0D0D]" />
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-mono font-medium text-[#0D0D0D]">{order.id}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-xs font-sans font-medium text-gray-900">{order.customer.name}</p>
                        <p className="text-[10px] text-gray-400 font-sans">{order.customer.county}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <img src={order.product.thumbnail} alt="" className="w-8 h-10 object-cover rounded-md bg-gray-100 shrink-0" />
                        <p className="text-xs font-sans text-gray-700 truncate max-w-[130px]">{order.product.name}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-xs font-sans font-medium text-gray-900">KES {order.amount.toLocaleString()}</p>
                      {order.qty > 1 && <p className="text-[10px] text-gray-400 font-sans">×{order.qty}</p>}
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={order.status} /></td>
                    <td className="px-4 py-3 text-[10px] text-gray-400 font-sans whitespace-nowrap">{order.date}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <Link to={`/admin/orders/${order.id}`}
                          className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                          <Eye size={13} />
                        </Link>
                        <a href={`https://wa.me/${order.customer.phone.replace(/^0/, '254')}`}
                          target="_blank" rel="noopener noreferrer"
                          className="p-1.5 text-[#25D366] hover:bg-green-50 rounded-lg transition-colors">
                          <MessageCircle size={13} />
                        </a>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <ShoppingCart size={32} className="text-gray-200 mx-auto mb-3" />
              <p className="text-sm font-sans text-gray-400">No orders found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
