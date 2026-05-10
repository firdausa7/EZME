import { useState } from 'react';
import {
  CreditCard, CheckCircle, XCircle, Clock,
  Download, Search, RefreshCw, TrendingUp
} from 'lucide-react';
import { useAdminStore } from '../store/adminStore';

const PAYMENT_STATUS = {
  success: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-400', label: 'Success' },
  failed: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-400', label: 'Failed' },
  pending: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-400', label: 'Pending' },
};

function derivePayments(orders) {
  return orders.map(o => ({
    ref: o.mpesa || null,
    orderId: o.id,
    customer: o.customer.name,
    phone: o.customer.phone,
    amount: o.amount,
    date: o.date,
    status: o.mpesa ? (o.status === 'Cancelled' ? 'failed' : 'success') : 'pending',
  })).sort((a, b) => new Date(b.date) - new Date(a.date));
}

function PaymentBadge({ status }) {
  const s = PAYMENT_STATUS[status];
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-sans px-2.5 py-0.5 rounded-full ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

export default function AdminPayments() {
  const { orders } = useAdminStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const payments = derivePayments(orders);

  const filtered = payments.filter(p => {
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (p.ref && p.ref.toLowerCase().includes(q)) ||
        p.orderId.toLowerCase().includes(q) ||
        p.customer.toLowerCase().includes(q);
    }
    return true;
  });

  const totalSuccess = payments.filter(p => p.status === 'success').reduce((s, p) => s + p.amount, 0);
  const totalPending = payments.filter(p => p.status === 'pending').reduce((s, p) => s + p.amount, 0);
  const totalFailed = payments.filter(p => p.status === 'failed').reduce((s, p) => s + p.amount, 0);

  const exportCSV = () => {
    const rows = [
      ['Ref', 'Order ID', 'Customer', 'Phone', 'Amount', 'Status', 'Date'],
      ...filtered.map(p => [p.ref || '', p.orderId, p.customer, p.phone, p.amount, p.status, p.date])
    ];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = 'ezme-payments.csv'; a.click();
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-light text-gray-900">Payments</h1>
          <p className="text-xs font-sans text-gray-500 mt-0.5">M-PESA transaction log</p>
        </div>
        <button onClick={exportCSV}
          className="flex items-center gap-1.5 text-xs font-sans text-gray-600 border border-gray-200 px-3 py-2 rounded-lg hover:border-gray-300">
          <Download size={13} /> Export
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center">
              <CheckCircle size={16} className="text-green-600" />
            </div>
            <p className="text-xs font-sans text-gray-500">Confirmed</p>
          </div>
          <p className="font-serif text-2xl font-light text-gray-900">KES {totalSuccess.toLocaleString()}</p>
          <p className="text-[10px] font-sans text-gray-400 mt-0.5">{payments.filter(p => p.status === 'success').length} transactions</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
              <Clock size={16} className="text-amber-600" />
            </div>
            <p className="text-xs font-sans text-gray-500">Pending</p>
          </div>
          <p className="font-serif text-2xl font-light text-gray-900">KES {totalPending.toLocaleString()}</p>
          <p className="text-[10px] font-sans text-gray-400 mt-0.5">{payments.filter(p => p.status === 'pending').length} awaiting payment</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
              <XCircle size={16} className="text-red-600" />
            </div>
            <p className="text-xs font-sans text-gray-500">Failed / Cancelled</p>
          </div>
          <p className="font-serif text-2xl font-light text-gray-900">KES {totalFailed.toLocaleString()}</p>
          <p className="text-[10px] font-sans text-gray-400 mt-0.5">{payments.filter(p => p.status === 'failed').length} transactions</p>
        </div>
      </div>

      {/* M-PESA info */}
      <div className="bg-[#0D0D0D] rounded-2xl p-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#25D366]/20 flex items-center justify-center">
            <CreditCard size={18} className="text-[#25D366]" />
          </div>
          <div>
            <p className="text-white text-sm font-sans font-medium">M-PESA Till</p>
            <p className="text-white/50 text-xs font-sans">EZME Abayas · Till No. 123456</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-white/50 text-[10px] font-sans uppercase tracking-wider">Total Collected</p>
          <p className="text-white font-serif text-xl font-light">KES {totalSuccess.toLocaleString()}</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-50 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-48 relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by ref, order ID, customer..."
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-xs font-sans outline-none focus:border-[#C9B8E8] focus:ring-2 focus:ring-[#C9B8E8]/20" />
          </div>
          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            {['all', 'success', 'pending', 'failed'].map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`text-[11px] font-sans px-3 py-2 capitalize transition-colors ${statusFilter === s ? 'bg-[#0D0D0D] text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {['Transaction Ref', 'Order ID', 'Customer', 'Phone', 'Amount', 'Status', 'Date'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-sans font-medium text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="text-xs font-mono text-gray-700">{p.ref || <span className="text-gray-300">—</span>}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-mono font-medium text-[#0D0D0D]">{p.orderId}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-sans text-gray-700">{p.customer}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-sans text-gray-600">{p.phone}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-sans font-medium text-gray-900">KES {p.amount.toLocaleString()}</span>
                  </td>
                  <td className="px-4 py-3"><PaymentBadge status={p.status} /></td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] text-gray-400 font-sans">{p.date}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <CreditCard size={32} className="text-gray-200 mx-auto mb-3" />
              <p className="text-sm font-sans text-gray-400">No transactions found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
