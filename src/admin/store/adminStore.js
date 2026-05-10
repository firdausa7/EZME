import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ADMIN_USERS, MOCK_ORDERS, MOCK_CUSTOMERS, NOTIFICATIONS, CONTENT_SECTIONS, STORE_SETTINGS } from '../data/mockData';
import { products } from '../../data/products';

export const useAdminAuth = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthed: false,

      login: (email, password) => {
        const u = ADMIN_USERS.find(u => u.email === email && u.password === password);
        if (u) { set({ user: u, isAuthed: true }); return { ok: true }; }
        return { ok: false, error: 'Invalid email or password' };
      },
      logout: () => set({ user: null, isAuthed: false }),
    }),
    { name: 'ezme-admin-auth', partialize: s => ({ user: s.user, isAuthed: s.isAuthed }) }
  )
);

export const useAdminStore = create((set, get) => ({
  // Products
  products: products.map((p, i) => ({
    ...p,
    price: p.price || 6000,
    stock: [12, 8, 5, 20, 10, 15, 25, 18, 7, 11, 9, 22, 14, 6, 16, 8, 20, 5, 13][i] || 10,
    sku: `EZME-${String(p.id).padStart(3, '0')}`,
    archived: false,
  })),

  updateProduct: (id, data) => set(s => ({
    products: s.products.map(p => p.id === id ? { ...p, ...data } : p)
  })),
  addProduct: (product) => set(s => ({
    products: [...s.products, { ...product, id: Date.now(), archived: false }]
  })),
  deleteProduct: (id) => set(s => ({
    products: s.products.filter(p => p.id !== id)
  })),
  archiveProduct: (id) => set(s => ({
    products: s.products.map(p => p.id === id ? { ...p, archived: !p.archived } : p)
  })),

  // Orders
  orders: MOCK_ORDERS,
  updateOrderStatus: (id, status) => set(s => ({
    orders: s.orders.map(o => o.id === id ? { ...o, status } : o)
  })),

  // Customers
  customers: MOCK_CUSTOMERS,
  updateCustomer: (id, data) => set(s => ({
    customers: s.customers.map(c => c.id === id ? { ...c, ...data } : c)
  })),

  // Notifications
  notifications: NOTIFICATIONS,
  markRead: (id) => set(s => ({
    notifications: s.notifications.map(n => n.id === id ? { ...n, read: true } : n)
  })),
  markAllRead: () => set(s => ({ notifications: s.notifications.map(n => ({ ...n, read: true })) })),

  // Content
  content: CONTENT_SECTIONS,
  updateContent: (section, data) => set(s => ({ content: { ...s.content, [section]: { ...s.content[section], ...data } } })),

  // Settings
  settings: STORE_SETTINGS,
  updateSettings: (data) => set(s => ({ settings: { ...s.settings, ...data } })),

  // UI
  sidebarOpen: true,
  toggleSidebar: () => set(s => ({ sidebarOpen: !s.sidebarOpen })),
  mobileSidebarOpen: false,
  setMobileSidebar: (v) => set({ mobileSidebarOpen: v }),
}));
