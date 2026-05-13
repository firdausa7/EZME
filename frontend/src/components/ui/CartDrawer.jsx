import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/useStore';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity } = useCartStore();
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
            onClick={closeCart}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} className="text-ezme-black" />
                <span className="font-serif text-xl font-light">Your Cart</span>
                {items.length > 0 && (
                  <span className="w-5 h-5 bg-ezme-black text-white text-[10px] rounded-full flex items-center justify-center font-sans">
                    {items.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                )}
              </div>
              <button onClick={closeCart} className="p-2 text-ezme-black hover:text-ezme-lavender transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <ShoppingBag size={48} className="text-gray-200 mb-4" />
                  <h3 className="font-serif text-2xl font-light text-ezme-black mb-2">Your cart is empty</h3>
                  <p className="text-sm text-ezme-taupe font-sans mb-6">Discover our luxury abaya collection</p>
                  <button onClick={closeCart}>
                    <Link to="/shop" className="btn-dark px-6 py-3 text-xs">Browse Collection</Link>
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {items.map(item => (
                    <motion.div
                      key={item.key}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex gap-4 p-5"
                    >
                      <div className="w-20 h-24 bg-ezme-mist overflow-hidden shrink-0">
                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-serif text-base font-medium text-ezme-black leading-tight">{item.name}</h4>
                            <p className="text-xs text-ezme-taupe font-sans mt-1">
                              {item.selectedSize && `Size: ${item.selectedSize}`}
                              {item.selectedColor && ` · ${item.selectedColor}`}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.key)}
                            className="text-gray-300 hover:text-red-400 transition-colors shrink-0"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-gray-200">
                            <button
                              onClick={() => updateQuantity(item.key, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-ezme-black hover:bg-ezme-mist transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center text-sm font-sans">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.key, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-ezme-black hover:bg-ezme-mist transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <span className="font-sans font-medium text-ezme-black text-sm">
                            KES {(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ezme-taupe font-sans">Subtotal</span>
                  <span className="font-serif text-xl font-medium">KES {total.toLocaleString()}</span>
                </div>
                <p className="text-xs text-ezme-taupe font-sans">Shipping calculated at checkout. Delivery arranged upon order confirmation.</p>
                <Link
                  to="/checkout"
                  onClick={closeCart}
                  className="btn-dark w-full flex items-center justify-center gap-2 py-4 text-xs"
                >
                  Proceed to Checkout <ArrowRight size={14} />
                </Link>
                <Link
                  to="/shop"
                  onClick={closeCart}
                  className="btn-outline w-full flex items-center justify-center gap-2 py-3.5 text-xs"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
