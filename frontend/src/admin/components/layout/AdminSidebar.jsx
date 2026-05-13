import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Package, ShoppingCart, Users, BarChart3,
  Settings, FileText, Bell, ChevronLeft, ChevronRight,
  Palette, LogOut, MessageSquare, CreditCard, Star
} from 'lucide-react';
import { useAdminAuth, useAdminStore } from '../../store/adminStore';

const NAV = [
  { label: 'Dashboard',   to: '/admin',             icon: LayoutDashboard },
  { label: 'Products',    to: '/admin/products',    icon: Package },
  { label: 'Orders',      to: '/admin/orders',      icon: ShoppingCart },
  { label: 'Customers',   to: '/admin/customers',   icon: Users },
  { label: 'Analytics',   to: '/admin/analytics',   icon: BarChart3 },
  { label: 'Content',     to: '/admin/content',     icon: Palette },
  { label: 'Payments',    to: '/admin/payments',    icon: CreditCard },
  { label: 'Notifications', to: '/admin/notifications', icon: Bell },
  { label: 'Settings',    to: '/admin/settings',    icon: Settings },
];

export default function AdminSidebar({ mobile }) {
  const location = useLocation();
  const { user, logout } = useAdminAuth();
  const { sidebarOpen, toggleSidebar, setMobileSidebar } = useAdminStore();
  const { notifications } = useAdminStore();
  const unread = notifications.filter(n => !n.read).length;

  const collapsed = !mobile && !sidebarOpen;

  const isActive = (to) => to === '/admin' ? location.pathname === '/admin' : location.pathname.startsWith(to);

  return (
    <aside className={`
      ${mobile ? 'w-64' : collapsed ? 'w-16 fixed' : 'w-64 fixed'}
      top-0 left-0 bottom-0 bg-[#0D0D0D] flex flex-col z-30 transition-all duration-300
    `}>
      {/* Logo */}
      <div className={`flex items-center border-b border-white/10 h-16 ${collapsed ? 'justify-center px-2' : 'justify-between px-5'}`}>
        {!collapsed && (
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.jpg" alt="EZME" className="h-8 w-8 rounded-full object-cover" />
            <span className="text-white/80 text-xs font-sans tracking-widest uppercase" style={{ letterSpacing: '0.18em' }}>EZME</span>
          </Link>
        )}
        {collapsed && <img src="/logo.jpg" alt="EZME" className="h-7 w-7 rounded-full object-cover" />}
        {!mobile && (
          <button onClick={toggleSidebar} className="text-white/40 hover:text-white transition-colors p-1">
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden">
        {!collapsed && (
          <p className="text-white/20 text-[9px] font-sans tracking-widest uppercase px-5 mb-3" style={{ letterSpacing: '0.18em' }}>
            Management
          </p>
        )}
        <ul className="space-y-0.5 px-2">
          {NAV.map(item => {
            const active = isActive(item.to);
            return (
              <li key={item.label}>
                <Link
                  to={item.to}
                  onClick={() => mobile && setMobileSidebar(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-sans tracking-wide transition-all relative group ${
                    active
                      ? 'bg-white/10 text-white'
                      : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}
                  title={collapsed ? item.label : ''}
                >
                  <item.icon size={16} className={`shrink-0 ${active ? 'text-white' : ''}`} />
                  {!collapsed && <span style={{ letterSpacing: '0.06em' }}>{item.label}</span>}

                  {/* Notification badge */}
                  {item.label === 'Notifications' && unread > 0 && (
                    <span className={`${collapsed ? 'absolute top-1 right-1' : 'ml-auto'} w-4 h-4 bg-red-500 text-white text-[9px] rounded-full flex items-center justify-center`}>
                      {unread}
                    </span>
                  )}

                  {/* Active indicator */}
                  {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-ezme-lavender rounded-r-full" />}

                  {/* Tooltip for collapsed */}
                  {collapsed && (
                    <div className="absolute left-14 bg-white text-ezme-black text-xs font-sans px-2.5 py-1.5 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                      {item.label}
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User */}
      <div className={`border-t border-white/10 p-3 ${collapsed ? 'flex justify-center' : ''}`}>
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-ezme-lavender/30 flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-sans font-medium">{user?.avatar}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-sans font-medium truncate">{user?.name}</p>
              <p className="text-white/30 text-[10px] font-sans capitalize">{user?.role?.replace('_', ' ')}</p>
            </div>
            <button onClick={logout} title="Logout" className="text-white/30 hover:text-red-400 transition-colors p-1">
              <LogOut size={14} />
            </button>
          </div>
        ) : (
          <button onClick={logout} title="Logout" className="text-white/30 hover:text-red-400 transition-colors p-2">
            <LogOut size={16} />
          </button>
        )}
      </div>
    </aside>
  );
}
