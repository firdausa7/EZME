import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, MapPin, Phone, Mail, Package, CreditCard,
  MessageCircle, Printer, CheckCircle, Clock, X, ChevronDown
} from 'lucide-react';
import { useAdminStore } from '../store/adminStore';
import { STATUS_COLORS, ORDER_STATUSES } from '../data/mockData';
import toast from 'react-hot-toast';

function StatusBadge({ status }) {
  const s = STATUS_COLORS[status];
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-sans px-3 py-1 rounded-full ${s?.bg} ${s?.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s?.dot}`} />
      {status}
    </span>
  );
}

const STATUS_FLOW = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered'];

export default function AdminOrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders, updateOrderStatus } = useAdminStore();
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  const order = orders.find(o => o.id === id);

  if (!order) return (
    <div className="flex flex-col items-center justify-center py-24">
      <Package size={40} className="text-gray-200 mb-4" />
      <p className="text-gray-400 font-sans text-sm">Order not found</p>
      <Link to="/admin/orders" className="mt-3 text-xs font-sans text-[#C9B8E8] hover:underline">← Back to Orders</Link>
    </div>
  );

  const statusIdx = STATUS_FLOW.indexOf(order.status);
  const canProgress = order.status !== 'Delivered' && order.status !== 'Cancelled';

  const changeStatus = (status) => {
    updateOrderStatus(order.id, status);
    setShowStatusMenu(false);
    toast.success(`Order marked as ${status}`);
  };

  const waMessage = encodeURIComponent(
    `Hello ${order.customer.name}! 👋 Your Ezme order *${order.id}* (${order.product.name}) is now *${order.status}*. ${order.status === 'Shipped' ? 'It will arrive soon! 🦋' : ''}`
  );

  const handlePrint = () => window.print();

  return (
    <div className="space-y-5 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/admin/orders')}
          className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft size={16} />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-2xl font-light text-gray-900">{order.id}</h1>
            <StatusBadge status={order.status} />
          </div>
          <p className="text-xs font-sans text-gray-500 mt-0.5">Placed on {order.date}</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handlePrint}
            className="flex items-center gap-1.5 text-xs font-sans text-gray-600 border border-gray-200 px-3 py-2 rounded-lg hover:border-gray-300 transition-colors print:hidden">
            <Printer size={13} /> Print Invoice
          </button>
          <a href={`https://wa.me/${order.customer.phone.replace(/^0/, '254')}?text=${waMessage}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-sans text-white bg-[#25D366] px-3 py-2 rounded-lg hover:bg-[#1ebe5d] transition-colors">
            <MessageCircle size={13} /> WhatsApp
          </a>
        </div>
      </div>

      {/* Status tracker */}
      {order.status !== 'Cancelled' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-50 p-5">
          <div className="flex items-center justify-between">
            {STATUS_FLOW.map((s, i) => {
              const done = i <= statusIdx;
              const active = i === statusIdx;
              return (
                <div key={s} className="flex-1 flex flex-col items-center relative">
                  {i > 0 && (
                    <div className={`absolute left-0 right-1/2 top-3 h-0.5 -translate-y-1/2 ${i <= statusIdx ? 'bg-[#C9B8E8]' : 'bg-gray-200'}`} />
                  )}
                  {i < STATUS_FLOW.length - 1 && (
                    <div className={`absolute left-1/2 right-0 top-3 h-0.5 -translate-y-1/2 ${i < statusIdx ? 'bg-[#C9B8E8]' : 'bg-gray-200'}`} />
                  )}
                  <div className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                    active ? 'border-[#C9B8E8] bg-[#C9B8E8]' : done ? 'border-[#C9B8E8] bg-[#C9B8E8]' : 'border-gray-200 bg-white'
                  }`}>
                    {done ? <CheckCircle size={12} className="text-white" /> : <Clock size={10} className="text-gray-300" />}
                  </div>
                  <p className={`text-[10px] font-sans mt-1.5 ${active ? 'text-[#7a6b9a] font-medium' : done ? 'text-gray-500' : 'text-gray-300'}`}>{s}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Order items */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-50">
              <h3 className="font-serif text-base font-light text-gray-900">Order Items</h3>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-4">
                <img src={order.product.thumbnail} alt={order.product.name}
                  className="w-16 h-20 object-cover rounded-xl bg-gray-100 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-sans font-medium text-gray-900">{order.product.name}</p>
                  <p className="text-xs text-gray-500 font-sans mt-0.5">
                    {order.size && `Size: ${order.size}`}
                    {order.color && ` · ${order.color}`}
                  </p>
                  <p className="text-xs text-gray-400 font-sans mt-0.5">Qty: {order.qty}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-sans font-medium text-gray-900">KES {order.amount.toLocaleString()}</p>
                  <p className="text-[10px] text-gray-400 font-sans mt-0.5">KES {(order.amount / order.qty).toLocaleString()} each</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-50 space-y-1.5">
                <div className="flex justify-between text-xs font-sans text-gray-500">
                  <span>Subtotal</span>
                  <span>KES {order.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs font-sans text-gray-500">
                  <span>Delivery</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-sm font-sans font-medium text-gray-900 pt-1 border-t border-gray-100">
                  <span>Total</span>
                  <span>KES {order.amount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <p className="text-[10px] font-sans text-amber-600 uppercase tracking-wider mb-1">Customer Note</p>
              <p className="text-xs font-sans text-amber-800">{order.notes}</p>
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Customer */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-50 p-5">
            <h3 className="font-serif text-base font-light text-gray-900 mb-4">Customer</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#C9B8E8]/20 flex items-center justify-center shrink-0">
                  <span className="text-xs font-sans text-[#7a6b9a] font-medium">
                    {order.customer.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-sans font-medium text-gray-900">{order.customer.name}</p>
                  <p className="text-[10px] text-gray-400 font-sans">{order.customer.county}</p>
                </div>
              </div>
              <div className="space-y-2 text-xs font-sans text-gray-600">
                <div className="flex items-center gap-2">
                  <Phone size={12} className="text-gray-400" /> {order.customer.phone}
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={12} className="text-gray-400" /> {order.customer.email}
                </div>
                <div className="flex items-start gap-2">
                  <MapPin size={12} className="text-gray-400 mt-0.5 shrink-0" /> {order.address}
                </div>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-50 p-5">
            <h3 className="font-serif text-base font-light text-gray-900 mb-4">Payment</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-sans text-gray-400 uppercase tracking-wider">Method</span>
                <span className="text-xs font-sans text-gray-700 flex items-center gap-1.5">
                  <CreditCard size={12} className="text-green-600" /> M-PESA
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-sans text-gray-400 uppercase tracking-wider">Transaction</span>
                <span className="text-xs font-mono text-gray-700">{order.mpesa || '—'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-sans text-gray-400 uppercase tracking-wider">Amount</span>
                <span className="text-xs font-sans font-medium text-gray-900">KES {order.amount.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-sans text-gray-400 uppercase tracking-wider">Status</span>
                {order.mpesa
                  ? <span className="text-xs font-sans text-green-600 flex items-center gap-1"><CheckCircle size={11} /> Paid</span>
                  : <span className="text-xs font-sans text-amber-600 flex items-center gap-1"><Clock size={11} /> Pending</span>}
              </div>
            </div>
          </div>

          {/* Status change */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-50 p-5">
            <h3 className="font-serif text-base font-light text-gray-900 mb-4">Update Status</h3>
            <div className="relative">
              <button onClick={() => setShowStatusMenu(s => !s)}
                className="w-full flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2.5 text-xs font-sans text-gray-700 hover:border-gray-300 transition-colors">
                <StatusBadge status={order.status} />
                <ChevronDown size={13} className="text-gray-400" />
              </button>
              <AnimatePresence>
                {showStatusMenu && (
                  <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                    className="absolute top-11 left-0 right-0 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-10">
                    {ORDER_STATUSES.map(s => (
                      <button key={s} onClick={() => changeStatus(s)}
                        className={`w-full text-left px-3 py-2 text-xs font-sans transition-colors ${order.status === s ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-50'}`}
                        disabled={order.status === s}>
                        {s}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
