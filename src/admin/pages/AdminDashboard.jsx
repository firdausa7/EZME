import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  TrendingUp, ShoppingCart, Users, Package,
  ArrowUpRight, ArrowDownRight, Clock, CheckCircle,
  AlertTriangle, MessageSquare, ExternalLink
} from 'lucide-react';
import { useAdminStore, useAdminAuth } from '../store/adminStore';
import { REVENUE_DATA, CATEGORY_DATA, WEEKLY_DATA, ACTIVITY_LOGS, STATUS_COLORS } from '../data/mockData';

function StatCard({ icon: Icon, label, value, sub, trend, color, to }) {
  const positive = trend >= 0;
  return (
    <motion.div whileHover={{ y: -2 }} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={18} className="text-white" />
        </div>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-sans ${positive ? 'text-green-600' : 'text-red-500'}`}>
            {positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <p className="font-serif text-2xl font-light text-gray-900 mb-0.5">{value}</p>
      <p className="text-xs font-sans text-gray-500">{label}</p>
      {sub && <p className="text-[10px] font-sans text-gray-400 mt-0.5">{sub}</p>}
    </motion.div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3">
      <p className="text-xs font-sans text-gray-500 mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.name} className="text-sm font-sans font-medium text-gray-900">
          {p.name === 'revenue' ? `KES ${p.value.toLocaleString()}` : `${p.value} orders`}
        </p>
      ))}
    </div>
  );
};

export default function AdminDashboard() {
  const { user } = useAdminAuth();
  const { orders, products, customers } = useAdminStore();
  const [period, setPeriod] = useState('monthly');

  const totalRevenue = orders.filter(o => o.status === 'Delivered').reduce((s, o) => s + o.amount, 0);
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;
  const recentOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
  const lowStock = products.filter(p => p.stock <= 5);

  const chartData = period === 'monthly' ? REVENUE_DATA : WEEKLY_DATA;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-light text-gray-900">
            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-xs font-sans text-gray-500 mt-0.5">Here's what's happening with Ezme today.</p>
        </div>
        <div className="flex gap-2">
          <a href="/" target="_blank" rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 text-xs font-sans text-gray-600 border border-gray-200 px-3 py-2 rounded-lg hover:border-gray-300 transition-colors">
            <ExternalLink size={12} /> View Store
          </a>
          <Link to="/admin/orders" className="btn-dark px-4 py-2 text-[11px] rounded-lg">New Order</Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={TrendingUp} label="Total Revenue" value={`KES ${totalRevenue.toLocaleString()}`} sub="Delivered orders only" trend={12} color="bg-[#0D0D0D]" />
        <StatCard icon={ShoppingCart} label="Total Orders" value={orders.length} sub={`${pendingOrders} pending`} trend={8} color="bg-[#C9B8E8]" />
        <StatCard icon={Users} label="Customers" value={customers.length.toLocaleString()} sub="Active accounts" trend={15} color="bg-[#E8B4B8]" />
        <StatCard icon={Package} label="Products" value={products.filter(p => !p.archived).length} sub={`${lowStock.length} low stock`} trend={-2} color="bg-[#B0C4DE]" />
      </div>

      {/* Status pills */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {[
          { label: 'Pending', val: orders.filter(o => o.status === 'Pending').length, color: 'bg-amber-50 text-amber-700 border-amber-200' },
          { label: 'Confirmed', val: orders.filter(o => o.status === 'Confirmed').length, color: 'bg-blue-50 text-blue-700 border-blue-200' },
          { label: 'Processing', val: orders.filter(o => o.status === 'Processing').length, color: 'bg-purple-50 text-purple-700 border-purple-200' },
          { label: 'Shipped', val: orders.filter(o => o.status === 'Shipped').length, color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
          { label: 'Delivered', val: deliveredOrders, color: 'bg-green-50 text-green-700 border-green-200' },
          { label: 'Cancelled', val: orders.filter(o => o.status === 'Cancelled').length, color: 'bg-red-50 text-red-700 border-red-200' },
        ].map(s => (
          <div key={s.label} className={`rounded-xl border px-3 py-2.5 text-center ${s.color}`}>
            <p className="font-serif text-xl font-light">{s.val}</p>
            <p className="text-[10px] font-sans mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Revenue chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-serif text-lg font-light text-gray-900">Revenue Overview</h3>
              <p className="text-xs font-sans text-gray-400 mt-0.5">KES {REVENUE_DATA.reduce((s, d) => s + d.revenue, 0).toLocaleString()} total</p>
            </div>
            <div className="flex rounded-lg border border-gray-200 overflow-hidden">
              {['monthly', 'weekly'].map(p => (
                <button key={p} onClick={() => setPeriod(p)}
                  className={`text-[11px] font-sans px-3 py-1.5 capitalize transition-colors ${period === p ? 'bg-[#0D0D0D] text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C9B8E8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#C9B8E8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
              <XAxis dataKey={period === 'monthly' ? 'month' : 'day'} tick={{ fontSize: 11, fontFamily: 'Jost' }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fontFamily: 'Jost' }} tickLine={false} axisLine={false} tickFormatter={v => `${v / 1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" stroke="#C9B8E8" strokeWidth={2.5} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category pie */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
          <h3 className="font-serif text-lg font-light text-gray-900 mb-1">Revenue by Category</h3>
          <p className="text-xs font-sans text-gray-400 mb-5">Sales distribution</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={CATEGORY_DATA} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3}>
                {CATEGORY_DATA.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-3">
            {CATEGORY_DATA.map(d => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                  <span className="text-xs font-sans text-gray-600">{d.name}</span>
                </div>
                <span className="text-xs font-sans font-medium text-gray-900">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Recent orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <h3 className="font-serif text-lg font-light text-gray-900">Recent Orders</h3>
            <Link to="/admin/orders" className="text-xs font-sans text-[#C9B8E8] hover:text-[#b0a0d4] transition-colors">View all →</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentOrders.map(order => {
              const s = STATUS_COLORS[order.status];
              return (
                <Link key={order.id} to={`/admin/orders/${order.id}`}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50/50 transition-colors group">
                  <img src={order.product.thumbnail} alt="" className="w-10 h-12 object-cover rounded-lg bg-gray-100 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-sans font-medium text-gray-900 truncate">{order.customer.name}</p>
                    <p className="text-[11px] text-gray-400 font-sans truncate">{order.product.name}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-sans font-medium text-gray-900">KES {order.amount.toLocaleString()}</p>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-sans px-2 py-0.5 rounded-full ${s.bg} ${s.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                      {order.status}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Low stock alerts */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-50">
              <AlertTriangle size={15} className="text-amber-500" />
              <h3 className="font-serif text-base font-light text-gray-900">Low Stock</h3>
            </div>
            {lowStock.length === 0 ? (
              <p className="px-5 py-4 text-xs text-gray-400 font-sans">All products well stocked 🎉</p>
            ) : (
              <div className="divide-y divide-gray-50">
                {lowStock.map(p => (
                  <Link key={p.id} to={`/admin/products/${p.id}`}
                    className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50/50 transition-colors">
                    <img src={p.thumbnail} alt="" className="w-8 h-10 object-cover rounded-md bg-gray-100 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-sans text-gray-800 truncate">{p.name}</p>
                    </div>
                    <span className="text-xs font-sans font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                      {p.stock} left
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Activity log */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-50">
              <h3 className="font-serif text-base font-light text-gray-900">Activity Log</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {ACTIVITY_LOGS.slice(0, 4).map(log => (
                <div key={log.id} className="px-5 py-3">
                  <p className="text-[11px] font-sans text-gray-700 leading-snug">{log.action}</p>
                  <p className="text-[10px] text-gray-400 font-sans mt-0.5">{log.user} · {log.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
