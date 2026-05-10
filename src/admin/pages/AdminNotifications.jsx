import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell, ShoppingCart, CreditCard, Package, MessageSquare,
  CheckCheck, Trash2, AlertTriangle
} from 'lucide-react';
import { useAdminStore } from '../store/adminStore';
import toast from 'react-hot-toast';

const TYPE_ICONS = {
  order: { icon: ShoppingCart, color: 'bg-blue-50 text-blue-600' },
  payment: { icon: CreditCard, color: 'bg-green-50 text-green-600' },
  stock: { icon: AlertTriangle, color: 'bg-amber-50 text-amber-600' },
  whatsapp: { icon: MessageSquare, color: 'bg-[#25D366]/10 text-[#25D366]' },
};

export default function AdminNotifications() {
  const { notifications, markRead, markAllRead } = useAdminStore();
  const unread = notifications.filter(n => !n.read).length;

  const handleMarkAll = () => {
    markAllRead();
    toast.success('All notifications marked as read');
  };

  return (
    <div className="space-y-5 max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-light text-gray-900">Notifications</h1>
          <p className="text-xs font-sans text-gray-500 mt-0.5">
            {unread > 0 ? `${unread} unread` : 'All caught up'} · {notifications.length} total
          </p>
        </div>
        {unread > 0 && (
          <button onClick={handleMarkAll}
            className="flex items-center gap-1.5 text-xs font-sans text-gray-600 border border-gray-200 px-3 py-2 rounded-lg hover:border-gray-300 transition-colors">
            <CheckCheck size={13} /> Mark all read
          </button>
        )}
      </div>

      {/* Unread section */}
      {unread > 0 && (
        <div>
          <p className="text-[10px] font-sans text-gray-400 uppercase tracking-widest mb-3">Unread · {unread}</p>
          <div className="space-y-2">
            <AnimatePresence>
              {notifications.filter(n => !n.read).map(n => {
                const t = TYPE_ICONS[n.type] || TYPE_ICONS.order;
                const Icon = t.icon;
                return (
                  <motion.div key={n.id}
                    initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 20 }}
                    className="bg-white rounded-2xl shadow-sm border border-[#C9B8E8]/30 p-4 flex items-start gap-4 relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#C9B8E8]" />
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${t.color}`}>
                      <Icon size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-sans font-medium text-gray-900">{n.title}</p>
                      <p className="text-xs font-sans text-gray-500 mt-0.5">{n.message}</p>
                      <p className="text-[10px] font-sans text-gray-400 mt-1">{n.time}</p>
                    </div>
                    <button onClick={() => markRead(n.id)}
                      className="shrink-0 p-1.5 text-gray-300 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <CheckCheck size={14} />
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Read section */}
      {notifications.filter(n => n.read).length > 0 && (
        <div>
          <p className="text-[10px] font-sans text-gray-400 uppercase tracking-widest mb-3">Earlier</p>
          <div className="space-y-2">
            {notifications.filter(n => n.read).map(n => {
              const t = TYPE_ICONS[n.type] || TYPE_ICONS.order;
              const Icon = t.icon;
              return (
                <div key={n.id} className="bg-white rounded-2xl shadow-sm border border-gray-50 p-4 flex items-start gap-4 opacity-60">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${t.color} opacity-60`}>
                    <Icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-sans font-medium text-gray-700">{n.title}</p>
                    <p className="text-xs font-sans text-gray-400 mt-0.5">{n.message}</p>
                    <p className="text-[10px] font-sans text-gray-300 mt-1">{n.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {notifications.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-50 py-20 text-center">
          <Bell size={40} className="text-gray-200 mx-auto mb-4" />
          <p className="text-sm font-sans text-gray-400">No notifications yet</p>
        </div>
      )}
    </div>
  );
}
