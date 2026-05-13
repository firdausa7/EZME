import { useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';
import {
  TrendingUp, ShoppingCart, Users, Package,
  ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { useAdminStore } from '../store/adminStore';
import { REVENUE_DATA, CATEGORY_DATA, WEEKLY_DATA } from '../data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3">
      <p className="text-xs font-sans text-gray-500 mb-1.5">{label}</p>
      {payload.map(p => (
        <p key={p.name} className="text-sm font-sans font-medium text-gray-900">
          {p.name === 'revenue' ? `KES ${p.value.toLocaleString()}` : `${p.value} ${p.name}`}
        </p>
      ))}
    </div>
  );
};

const PRODUCT_PERFORMANCE = [
  { name: 'Powder Blue', revenue: 34800, units: 6, color: '#C9B8E8' },
  { name: 'Black & Gold', revenue: 25500, units: 3, color: '#0D0D0D' },
  { name: 'Grey Marble', revenue: 19600, units: 2, color: '#8B7355' },
  { name: 'Lavender Floral', revenue: 18600, units: 3, color: '#E8B4B8' },
  { name: 'Burgundy Rose', revenue: 14400, units: 2, color: '#7B2D3E' },
  { name: 'Royal Blue', revenue: 12600, units: 3, color: '#B0C4DE' },
  { name: 'Black Lace', revenue: 9600, units: 2, color: '#1a1a1a' },
];

const COUNTY_DATA = [
  { county: 'Nairobi', orders: 18, revenue: 97400 },
  { county: 'Mombasa', orders: 8, revenue: 46300 },
  { county: 'Kisumu', orders: 3, revenue: 14600 },
  { county: 'Nakuru', orders: 2, revenue: 12400 },
  { county: 'Eldoret', orders: 1, revenue: 5800 },
];

const COHORT_DATA = [
  { month: 'Nov', new: 8, returning: 10 },
  { month: 'Dec', new: 15, returning: 19 },
  { month: 'Jan', new: 10, returning: 14 },
  { month: 'Feb', new: 12, returning: 16 },
  { month: 'Mar', new: 18, returning: 23 },
  { month: 'Apr', new: 16, returning: 21 },
  { month: 'May', new: 11, returning: 18 },
];

function KPI({ icon: Icon, label, value, trend, color }) {
  const positive = trend >= 0;
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={18} className="text-white" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-sans ${positive ? 'text-green-600' : 'text-red-500'}`}>
          {positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
          {Math.abs(trend)}%
        </div>
      </div>
      <p className="font-serif text-2xl font-light text-gray-900">{value}</p>
      <p className="text-xs font-sans text-gray-500 mt-0.5">{label}</p>
    </div>
  );
}

export default function AdminAnalytics() {
  const { orders, products, customers } = useAdminStore();
  const [period, setPeriod] = useState('monthly');

  const totalRevenue = orders.filter(o => o.status === 'Delivered').reduce((s, o) => s + o.amount, 0);
  const avgOrderValue = orders.length ? Math.round(orders.reduce((s, o) => s + o.amount, 0) / orders.length) : 0;
  const chartData = period === 'monthly' ? REVENUE_DATA : WEEKLY_DATA;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl font-light text-gray-900">Analytics</h1>
        <p className="text-xs font-sans text-gray-500 mt-0.5">Business performance overview · May 2025</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI icon={TrendingUp} label="Total Revenue" value={`KES ${totalRevenue.toLocaleString()}`} trend={12} color="bg-[#0D0D0D]" />
        <KPI icon={ShoppingCart} label="Avg Order Value" value={`KES ${avgOrderValue.toLocaleString()}`} trend={5} color="bg-[#C9B8E8]" />
        <KPI icon={Users} label="Total Customers" value={customers.length} trend={15} color="bg-[#E8B4B8]" />
        <KPI icon={Package} label="Products Sold" value={orders.reduce((s, o) => s + o.qty, 0)} trend={8} color="bg-[#B0C4DE]" />
      </div>

      {/* Revenue + Customer trend */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-serif text-lg font-light text-gray-900">Revenue Trend</h3>
              <p className="text-xs font-sans text-gray-400 mt-0.5">
                KES {REVENUE_DATA.reduce((s, d) => s + d.revenue, 0).toLocaleString()} total · 7 months
              </p>
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
                <linearGradient id="revGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C9B8E8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#C9B8E8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
              <XAxis dataKey={period === 'monthly' ? 'month' : 'day'} tick={{ fontSize: 11, fontFamily: 'Jost' }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fontFamily: 'Jost' }} tickLine={false} axisLine={false} tickFormatter={v => `${v / 1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" stroke="#C9B8E8" strokeWidth={2.5} fill="url(#revGrad2)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category distribution */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
          <h3 className="font-serif text-lg font-light text-gray-900 mb-1">Sales by Category</h3>
          <p className="text-xs font-sans text-gray-400 mb-4">Revenue distribution</p>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={CATEGORY_DATA} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" paddingAngle={3}>
                {CATEGORY_DATA.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip formatter={v => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
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

      {/* Product performance + Orders chart */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Product performance */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
          <h3 className="font-serif text-lg font-light text-gray-900 mb-1">Product Performance</h3>
          <p className="text-xs font-sans text-gray-400 mb-5">Revenue by product</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={PRODUCT_PERFORMANCE} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fontFamily: 'Jost' }} tickLine={false} axisLine={false} tickFormatter={v => `${v / 1000}k`} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fontFamily: 'Jost' }} tickLine={false} axisLine={false} width={90} />
              <Tooltip formatter={(v) => `KES ${v.toLocaleString()}`} />
              <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
                {PRODUCT_PERFORMANCE.map((d, i) => <Cell key={i} fill={i === 0 ? '#C9B8E8' : '#E5E7EB'} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Customer acquisition */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
          <h3 className="font-serif text-lg font-light text-gray-900 mb-1">Customer Acquisition</h3>
          <p className="text-xs font-sans text-gray-400 mb-5">New vs returning customers</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={COHORT_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: 'Jost' }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fontFamily: 'Jost' }} tickLine={false} axisLine={false} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11, fontFamily: 'Jost' }} />
              <Bar dataKey="new" name="New" fill="#0D0D0D" radius={[4, 4, 0, 0]} />
              <Bar dataKey="returning" name="Returning" fill="#C9B8E8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Geographic breakdown */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
        <h3 className="font-serif text-lg font-light text-gray-900 mb-1">Orders by County</h3>
        <p className="text-xs font-sans text-gray-400 mb-5">Geographic distribution</p>
        <div className="space-y-3">
          {COUNTY_DATA.map(c => {
            const pct = Math.round((c.orders / 32) * 100);
            return (
              <div key={c.county} className="flex items-center gap-4">
                <span className="text-xs font-sans text-gray-600 w-20 shrink-0">{c.county}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-[#C9B8E8] h-full rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-[10px] text-gray-400 font-sans w-14 text-right">{c.orders} orders</span>
                  <span className="text-xs font-sans font-medium text-gray-700 w-24 text-right">KES {c.revenue.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Orders trend */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
        <h3 className="font-serif text-lg font-light text-gray-900 mb-1">Orders vs Revenue</h3>
        <p className="text-xs font-sans text-gray-400 mb-5">Monthly comparison</p>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={REVENUE_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: 'Jost' }} tickLine={false} axisLine={false} />
            <YAxis yAxisId="left" tick={{ fontSize: 11, fontFamily: 'Jost' }} tickLine={false} axisLine={false} tickFormatter={v => `${v / 1000}k`} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fontFamily: 'Jost' }} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11, fontFamily: 'Jost' }} />
            <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#C9B8E8" strokeWidth={2.5} dot={{ fill: '#C9B8E8', r: 4 }} />
            <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#0D0D0D" strokeWidth={2} dot={{ fill: '#0D0D0D', r: 3 }} strokeDasharray="4 2" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
