import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Package, ShoppingCart, Users, BarChart3,
  Plus, Edit2, Trash2, Search, TrendingUp, TrendingDown, Eye, Lock
} from 'lucide-react';
import { products } from '../data/products';

const ADMIN_PASSWORD = 'ezme2025';

const mockOrders = [
  { id: 'EZME-001', customer: 'Amina Hassan', product: 'Pearl Embroidered Abaya', amount: 7800, status: 'delivered', date: '2025-05-08' },
  { id: 'EZME-002', customer: 'Fatuma Omar', product: 'Chiffon Flowy Abaya × 2', amount: 9600, status: 'processing', date: '2025-05-09' },
  { id: 'EZME-003', customer: 'Zara Abdullahi', product: 'Gold-Trim Couture Abaya', amount: 15000, status: 'shipped', date: '2025-05-09' },
  { id: 'EZME-004', customer: 'Khadija Mwangi', product: 'Midnight Classic Abaya', amount: 4500, status: 'pending', date: '2025-05-10' },
  { id: 'EZME-005', customer: 'Maryam Said', product: 'Butterfly Sleeve Abaya', amount: 6200, status: 'processing', date: '2025-05-10' },
];

const STATUS_STYLE = {
  delivered: 'bg-green-100 text-green-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  pending: 'bg-amber-100 text-amber-700',
};

function StatCard({ icon: Icon, label, value, trend, color }) {
  return (
    <div className="bg-white p-6 shadow-sm border border-gray-50">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-sans text-taupe tracking-wider uppercase mb-1" style={{ letterSpacing: '0.1em' }}>{label}</p>
          <p className="font-display text-3xl font-light text-charcoal">{value}</p>
        </div>
        <div className={`w-10 h-10 rounded flex items-center justify-center ${color}`}>
          <Icon size={18} className="text-white" />
        </div>
      </div>
      {trend && (
        <div className={`flex items-center gap-1 mt-3 text-xs font-sans ${trend > 0 ? 'text-green-600' : 'text-red-500'}`}>
          {trend > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {Math.abs(trend)}% vs last month
        </div>
      )}
    </div>
  );
}

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [pwError, setPwError] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [productList, setProductList] = useState(products);
  const [search, setSearch] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) { setAuthed(true); setPwError(false); }
    else setPwError(true);
  };

  if (!authed) {
    return (
      <main className="pt-28 min-h-screen bg-mist flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 max-w-sm w-full shadow-luxury text-center"
        >
          <div className="w-14 h-14 bg-charcoal rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock size={20} className="text-white" />
          </div>
          <h2 className="font-display text-2xl font-light text-charcoal mb-1">Admin Access</h2>
          <p className="text-xs text-taupe font-sans mb-8">EZME Dashboard</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter admin password"
              value={pw}
              onChange={e => { setPw(e.target.value); setPwError(false); }}
              className={`w-full border px-4 py-3 text-sm font-sans outline-none transition-colors ${pwError ? 'border-red-400' : 'border-gray-200 focus:border-charcoal'}`}
            />
            {pwError && <p className="text-xs text-red-500 font-sans text-left">Incorrect password</p>}
            <button type="submit" className="btn-gold w-full py-3.5 text-xs">Access Dashboard</button>
          </form>
          <p className="text-[10px] text-taupe font-sans mt-4">Demo: ezme2025</p>
        </motion.div>
      </main>
    );
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const filteredProducts = productList.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const totalRevenue = mockOrders.reduce((s, o) => s + o.amount, 0);

  return (
    <main className="pt-20 min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-charcoal min-h-screen flex flex-col fixed left-0 top-0 bottom-0 z-30 pt-20">
        <div className="p-6 border-b border-white/10">
          <span className="font-display text-2xl text-white tracking-widest" style={{ letterSpacing: '0.3em' }}>EZME</span>
          <p className="text-white/40 text-xs font-sans mt-0.5">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-sans tracking-wider uppercase transition-all rounded ${
                activeTab === tab.id ? 'bg-gold text-white' : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
              style={{ letterSpacing: '0.08em' }}
            >
              <tab.icon size={15} />
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <p className="text-white/30 text-xs font-sans">Logged in as Admin</p>
          <button onClick={() => setAuthed(false)} className="text-white/40 hover:text-white text-xs font-sans mt-1 transition-colors">Sign out</button>
        </div>
      </aside>

      {/* Content */}
      <div className="ml-56 flex-1 p-8">
        {activeTab === 'dashboard' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="font-display text-3xl font-light text-charcoal mb-8">Dashboard Overview</h1>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard icon={BarChart3} label="Total Revenue" value={`KES ${totalRevenue.toLocaleString()}`} trend={12} color="bg-gold" />
              <StatCard icon={ShoppingCart} label="Total Orders" value={mockOrders.length} trend={8} color="bg-blue-500" />
              <StatCard icon={Package} label="Products" value={productList.length} trend={5} color="bg-purple-500" />
              <StatCard icon={Users} label="Customers" value="2,041" trend={15} color="bg-green-500" />
            </div>

            {/* Recent orders */}
            <div className="bg-white shadow-sm border border-gray-50">
              <div className="p-5 border-b border-gray-50 flex items-center justify-between">
                <h2 className="font-display text-xl font-light text-charcoal">Recent Orders</h2>
                <button onClick={() => setActiveTab('orders')} className="text-xs font-sans text-gold hover:underline">View all</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-50">
                      {['Order ID', 'Customer', 'Product', 'Amount', 'Status', 'Date'].map(h => (
                        <th key={h} className="text-left px-5 py-3 text-[10px] font-sans text-taupe uppercase tracking-widest" style={{ letterSpacing: '0.1em' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {mockOrders.map(o => (
                      <tr key={o.id} className="border-b border-gray-50 hover:bg-mist transition-colors">
                        <td className="px-5 py-3.5 text-xs font-sans font-medium text-charcoal">{o.id}</td>
                        <td className="px-5 py-3.5 text-xs font-sans text-charcoal">{o.customer}</td>
                        <td className="px-5 py-3.5 text-xs font-sans text-taupe">{o.product}</td>
                        <td className="px-5 py-3.5 text-xs font-sans font-medium text-charcoal">KES {o.amount.toLocaleString()}</td>
                        <td className="px-5 py-3.5">
                          <span className={`text-[10px] font-sans px-2.5 py-1 rounded-full capitalize ${STATUS_STYLE[o.status]}`}>{o.status}</span>
                        </td>
                        <td className="px-5 py-3.5 text-xs font-sans text-taupe">{o.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'products' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-display text-3xl font-light text-charcoal">Products</h1>
                <p className="text-sm text-taupe font-sans mt-1">{productList.length} total products</p>
              </div>
              <button className="btn-gold px-5 py-2.5 text-xs flex items-center gap-2">
                <Plus size={14} /> Add Product
              </button>
            </div>

            <div className="bg-white shadow-sm mb-4 flex items-center gap-3 px-4 border border-gray-100">
              <Search size={16} className="text-taupe" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 py-3.5 text-sm font-sans text-charcoal outline-none"
              />
            </div>

            <div className="bg-white shadow-sm border border-gray-50 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-50">
                    {['Product', 'Category', 'Price', 'Stock', 'Rating', 'Actions'].map(h => (
                      <th key={h} className="text-left px-5 py-3 text-[10px] font-sans text-taupe uppercase tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(p => (
                    <tr key={p.id} className="border-b border-gray-50 hover:bg-mist transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img src={p.images[0]} alt={p.name} className="w-10 h-12 object-cover bg-mist" />
                          <div>
                            <p className="text-xs font-sans font-medium text-charcoal">{p.name}</p>
                            {p.badge && <span className="text-[9px] font-sans text-gold">{p.badge}</span>}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-xs font-sans text-taupe capitalize">{p.category}</td>
                      <td className="px-5 py-4 text-xs font-sans font-medium text-charcoal">KES {p.price.toLocaleString()}</td>
                      <td className="px-5 py-4">
                        <span className="text-[10px] font-sans px-2 py-0.5 bg-green-100 text-green-700 rounded-full">In Stock</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1">
                          <span className="text-gold text-xs">★</span>
                          <span className="text-xs font-sans text-charcoal">{p.rating}</span>
                          <span className="text-[10px] text-taupe font-sans">({p.reviews})</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button className="text-taupe hover:text-blue-500 transition-colors"><Eye size={14} /></button>
                          <button className="text-taupe hover:text-charcoal transition-colors"><Edit2 size={14} /></button>
                          <button
                            className="text-taupe hover:text-red-500 transition-colors"
                            onClick={() => setProductList(prev => prev.filter(x => x.id !== p.id))}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'orders' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="font-display text-3xl font-light text-charcoal mb-8">Orders</h1>
            <div className="bg-white shadow-sm border border-gray-50 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-50">
                    {['Order ID', 'Customer', 'Product', 'Amount', 'Status', 'Date', 'Action'].map(h => (
                      <th key={h} className="text-left px-5 py-3 text-[10px] font-sans text-taupe uppercase tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockOrders.map(o => (
                    <tr key={o.id} className="border-b border-gray-50 hover:bg-mist transition-colors">
                      <td className="px-5 py-4 text-xs font-sans font-medium text-charcoal">{o.id}</td>
                      <td className="px-5 py-4 text-xs font-sans text-charcoal">{o.customer}</td>
                      <td className="px-5 py-4 text-xs font-sans text-taupe">{o.product}</td>
                      <td className="px-5 py-4 text-xs font-sans font-medium text-charcoal">KES {o.amount.toLocaleString()}</td>
                      <td className="px-5 py-4">
                        <span className={`text-[10px] font-sans px-2.5 py-1 rounded-full capitalize ${STATUS_STYLE[o.status]}`}>{o.status}</span>
                      </td>
                      <td className="px-5 py-4 text-xs font-sans text-taupe">{o.date}</td>
                      <td className="px-5 py-4">
                        <a
                          href={`https://wa.me/254799932131?text=${encodeURIComponent(`Order update for ${o.id} - ${o.customer}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-sans text-[#25D366] hover:underline"
                        >
                          WhatsApp
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'customers' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="font-display text-3xl font-light text-charcoal mb-8">Customers</h1>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <StatCard icon={Users} label="Total Customers" value="2,041" trend={15} color="bg-blue-500" />
              <StatCard icon={TrendingUp} label="New This Month" value="128" trend={22} color="bg-green-500" />
              <StatCard icon={ShoppingCart} label="Repeat Buyers" value="67%" trend={5} color="bg-purple-500" />
            </div>
            <div className="bg-white p-8 shadow-sm text-center">
              <Users size={40} className="text-gray-200 mx-auto mb-4" />
              <p className="font-display text-xl text-charcoal mb-2">Customer Management</p>
              <p className="text-sm text-taupe font-sans">Customer database would be connected to your backend. Currently showing aggregated stats.</p>
            </div>
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="font-display text-3xl font-light text-charcoal mb-8">Analytics</h1>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard icon={BarChart3} label="Monthly Revenue" value="KES 43,100" trend={12} color="bg-gold" />
              <StatCard icon={Eye} label="Page Views" value="8,420" trend={18} color="bg-blue-500" />
              <StatCard icon={ShoppingCart} label="Conversion Rate" value="3.2%" trend={-2} color="bg-purple-500" />
              <StatCard icon={Package} label="Avg Order Value" value="KES 8,620" trend={7} color="bg-green-500" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-6 shadow-sm">
                <h3 className="font-display text-lg font-light text-charcoal mb-4">Top Products</h3>
                <div className="space-y-3">
                  {products.sort((a, b) => b.reviews - a.reviews).slice(0, 5).map((p, i) => (
                    <div key={p.id} className="flex items-center gap-3">
                      <span className="text-xs text-taupe font-sans w-4">{i + 1}</span>
                      <img src={p.images[0]} alt={p.name} className="w-8 h-10 object-cover bg-mist" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-sans text-charcoal truncate">{p.name}</p>
                        <p className="text-[10px] text-taupe font-sans">{p.reviews} sales</p>
                      </div>
                      <span className="text-xs font-sans font-medium text-charcoal">KES {p.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-6 shadow-sm">
                <h3 className="font-display text-lg font-light text-charcoal mb-4">Revenue by Category</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Luxury', pct: 45, color: 'bg-gold' },
                    { label: 'Occasion', pct: 30, color: 'bg-charcoal' },
                    { label: 'Everyday', pct: 25, color: 'bg-taupe' },
                  ].map(c => (
                    <div key={c.label}>
                      <div className="flex justify-between text-xs font-sans text-taupe mb-1">
                        <span>{c.label}</span>
                        <span>{c.pct}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full ${c.color} rounded-full`} style={{ width: `${c.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
