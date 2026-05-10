import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, selectedSize, selectedColor, quantity = 1) => {
        const key = `${product.id}-${selectedSize}-${selectedColor}`;
        const existing = get().items.find(i => i.key === key);
        if (existing) {
          set(s => ({ items: s.items.map(i => i.key === key ? { ...i, quantity: i.quantity + quantity } : i) }));
        } else {
          set(s => ({ items: [...s.items, { ...product, key, selectedSize, selectedColor, quantity }], isOpen: true }));
        }
      },

      removeItem: (key) => set(s => ({ items: s.items.filter(i => i.key !== key) })),

      updateQuantity: (key, quantity) => {
        if (quantity < 1) return get().removeItem(key);
        set(s => ({ items: s.items.map(i => i.key === key ? { ...i, quantity } : i) }));
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      get total() { return get().items.reduce((sum, i) => sum + i.price * i.quantity, 0); },
      get count() { return get().items.reduce((sum, i) => sum + i.quantity, 0); },
    }),
    { name: 'ezme-cart', partialize: s => ({ items: s.items }) }
  )
);

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],
      toggle: (product) => {
        const exists = get().items.find(i => i.id === product.id);
        if (exists) {
          set(s => ({ items: s.items.filter(i => i.id !== product.id) }));
        } else {
          set(s => ({ items: [...s.items, product] }));
        }
      },
      isWishlisted: (id) => get().items.some(i => i.id === id),
      count: () => get().items.length,
    }),
    { name: 'ezme-wishlist', partialize: s => ({ items: s.items }) }
  )
);

export const useSearchStore = create(set => ({
  isOpen: false,
  query: '',
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false, query: '' }),
  setQuery: (q) => set({ query: q }),
}));
