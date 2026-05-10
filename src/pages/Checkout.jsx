import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Lock, ChevronRight } from 'lucide-react';
import { useCartStore } from '../store/useStore';

const STEPS = ['Cart', 'Details', 'Payment', 'Confirm'];

const COUNTIES = ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Malindi', 'Other'];

export default function Checkout() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', email: '', county: 'Nairobi', address: '', notes: '' });
  const [payMethod, setPayMethod] = useState('mpesa');
  const [mpesaPhone, setMpesaPhone] = useState('');
  const [processing, setProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const { items, clearCart } = useCartStore();
  const navigate = useNavigate();
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const delivery = 350;
  const total = subtotal + delivery;

  const handleOrder = async () => {
    setProcessing(true);
    await new Promise(r => setTimeout(r, 2500));
    const num = `EZME-${Date.now().toString().slice(-6)}`;
    setOrderNumber(num);
    setOrderPlaced(true);
    clearCart();
    setProcessing(false);
  };

  if (orderPlaced) {
    return (
      <main className="pt-28 min-h-screen bg-ezme-mist flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 max-w-md w-full text-center shadow-card"
        >
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <Check size={28} className="text-green-600" />
          </div>
          <h2 className="font-serif text-3xl font-light text-ezme-black mb-2">Order Placed!</h2>
          <p className="text-ezme-taupe font-sans text-sm mb-1">Thank you, {form.firstName}.</p>
          <p className="text-xs font-sans text-ezme-taupe mb-6">Order: <strong className="text-ezme-black">{orderNumber}</strong></p>
          <div className="bg-ezme-mist p-4 mb-6 text-left">
            <p className="text-xs font-sans text-ezme-taupe mb-1">What happens next?</p>
            <ul className="space-y-2 mt-2">
              {[
                'You will receive a WhatsApp confirmation shortly',
                'Your order will be prepared within 1-2 business days',
                `Delivery to ${form.county} within 2-5 business days`,
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-2 text-xs font-sans text-ezme-black">
                  <span className="text-ezme-lavender mt-0.5">•</span> {t}
                </li>
              ))}
            </ul>
          </div>
          <Link to="/" className="btn-dark w-full py-3.5 text-xs flex items-center justify-center">Return to Homepage</Link>
          <a
            href={`https://wa.me/254799932131?text=${encodeURIComponent(`Hi EZME! I just placed order ${orderNumber}. Please confirm.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block text-xs font-sans text-[#25D366] hover:underline"
          >
            Confirm via WhatsApp
          </a>
        </motion.div>
      </main>
    );
  }

  if (items.length === 0 && !orderPlaced) {
    return (
      <main className="pt-28 min-h-screen flex items-center justify-center flex-col gap-4">
        <h2 className="font-serif text-3xl text-ezme-black">Your cart is empty</h2>
        <Link to="/shop" className="btn-dark px-8 py-3 text-xs">Browse Collection</Link>
      </main>
    );
  }

  return (
    <main className="pt-24 min-h-screen bg-ezme-mist">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Progress */}
        <div className="flex items-center justify-center gap-0 mb-12">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className={`flex flex-col items-center gap-1.5 ${i + 1 < step ? 'cursor-pointer' : ''}`}
                onClick={() => i + 1 < step && setStep(i + 1)}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-sans transition-colors ${
                  i + 1 < step ? 'bg-green-600 text-white' : i + 1 === step ? 'bg-ezme-black text-white' : 'bg-gray-200 text-ezme-taupe'
                }`}>
                  {i + 1 < step ? <Check size={14} /> : i + 1}
                </div>
                <span className={`text-[10px] font-sans tracking-widest uppercase hidden md:block ${i + 1 === step ? 'text-ezme-black' : 'text-ezme-taupe'}`}
                  style={{ letterSpacing: '0.12em' }}>{s}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-12 md:w-20 h-px mx-2 ${i + 1 < step ? 'bg-green-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 md:p-8 shadow-sm">
              {step === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="font-serif text-2xl font-light mb-6">Contact & Delivery Details</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { key: 'firstName', label: 'First Name', span: 1 },
                      { key: 'lastName', label: 'Last Name', span: 1 },
                      { key: 'phone', label: 'Phone Number', type: 'tel', span: 2, placeholder: '0700 000 000' },
                      { key: 'email', label: 'Email Address', type: 'email', span: 2 },
                    ].map(f => (
                      <div key={f.key} className={f.span === 2 ? 'col-span-2' : ''}>
                        <label className="block text-xs font-sans text-ezme-taupe uppercase tracking-wider mb-2" style={{ letterSpacing: '0.1em' }}>{f.label}</label>
                        <input
                          type={f.type || 'text'}
                          placeholder={f.placeholder}
                          value={form[f.key]}
                          onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                          className="w-full border border-gray-200 px-4 py-3 text-sm font-sans text-ezme-black outline-none focus:border-ezme-black transition-colors"
                        />
                      </div>
                    ))}
                    <div className="col-span-2">
                      <label className="block text-xs font-sans text-ezme-taupe uppercase tracking-wider mb-2">County / City</label>
                      <select
                        value={form.county}
                        onChange={e => setForm(p => ({ ...p, county: e.target.value }))}
                        className="w-full border border-gray-200 px-4 py-3 text-sm font-sans text-ezme-black outline-none focus:border-ezme-black"
                      >
                        {COUNTIES.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-sans text-ezme-taupe uppercase tracking-wider mb-2">Delivery Address</label>
                      <input
                        type="text"
                        placeholder="Street address, building, apartment..."
                        value={form.address}
                        onChange={e => setForm(p => ({ ...p, address: e.target.value }))}
                        className="w-full border border-gray-200 px-4 py-3 text-sm font-sans text-ezme-black outline-none focus:border-ezme-black transition-colors"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-sans text-ezme-taupe uppercase tracking-wider mb-2">Order Notes (optional)</label>
                      <textarea
                        rows={3}
                        placeholder="Any special instructions for your order..."
                        value={form.notes}
                        onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                        className="w-full border border-gray-200 px-4 py-3 text-sm font-sans text-ezme-black outline-none focus:border-ezme-black resize-none transition-colors"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    disabled={!form.firstName || !form.phone || !form.address}
                    className="mt-6 btn-dark w-full py-4 text-xs flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue to Payment <ChevronRight size={14} />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="font-serif text-2xl font-light mb-6">Payment Method</h2>

                  {/* M-PESA */}
                  <div
                    onClick={() => setPayMethod('mpesa')}
                    className={`border-2 p-5 cursor-pointer mb-4 transition-colors ${payMethod === 'mpesa' ? 'border-charcoal' : 'border-gray-100 hover:border-gray-200'}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${payMethod === 'mpesa' ? 'border-charcoal' : 'border-gray-300'}`}>
                          {payMethod === 'mpesa' && <div className="w-2 h-2 rounded-full bg-ezme-black" />}
                        </div>
                        <div>
                          <p className="font-sans font-medium text-sm text-ezme-black">M-PESA</p>
                          <p className="text-xs text-ezme-taupe font-sans">Pay via mobile money</p>
                        </div>
                      </div>
                      <div className="w-14 h-8 rounded bg-[#4caf50] flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold font-sans">M-PESA</span>
                      </div>
                    </div>
                    {payMethod === 'mpesa' && (
                      <div className="bg-green-50 rounded p-4 mt-2">
                        <p className="text-xs font-sans text-green-800 mb-3">Enter your M-PESA number to receive an STK push:</p>
                        <input
                          type="tel"
                          placeholder="07XX XXX XXX"
                          value={mpesaPhone}
                          onChange={e => setMpesaPhone(e.target.value)}
                          className="w-full border border-green-200 px-3 py-2.5 text-sm font-sans outline-none focus:border-green-500 rounded"
                        />
                        <div className="mt-3 p-3 bg-white rounded border border-green-100">
                          <p className="text-xs font-sans text-ezme-taupe">Business: <strong className="text-ezme-black">EZME Abayas</strong></p>
                          <p className="text-xs font-sans text-ezme-taupe">Till No: <strong className="text-ezme-black">123456</strong></p>
                          <p className="text-xs font-sans text-ezme-taupe">Amount: <strong className="text-ezme-black">KES {total.toLocaleString()}</strong></p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* WhatsApp Pay */}
                  <div
                    onClick={() => setPayMethod('whatsapp')}
                    className={`border-2 p-5 cursor-pointer mb-4 transition-colors ${payMethod === 'whatsapp' ? 'border-charcoal' : 'border-gray-100 hover:border-gray-200'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${payMethod === 'whatsapp' ? 'border-charcoal' : 'border-gray-300'}`}>
                        {payMethod === 'whatsapp' && <div className="w-2 h-2 rounded-full bg-ezme-black" />}
                      </div>
                      <div>
                        <p className="font-sans font-medium text-sm text-ezme-black">Pay via WhatsApp</p>
                        <p className="text-xs text-ezme-taupe font-sans">Confirm order and pay directly via WhatsApp</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-sans text-ezme-taupe mb-6">
                    <Lock size={12} /> Your payment is secured and encrypted
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="btn-outline px-6 py-4 text-xs">Back</button>
                    <button onClick={() => setStep(3)} className="btn-dark flex-1 py-4 text-xs flex items-center justify-center gap-2">
                      Review Order <ChevronRight size={14} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="font-serif text-2xl font-light mb-6">Review Your Order</h2>

                  <div className="space-y-4 mb-6">
                    {items.map(item => (
                      <div key={item.key} className="flex gap-4">
                        <img src={item.images[0]} alt={item.name} className="w-16 h-20 object-cover bg-ezme-mist" />
                        <div className="flex-1">
                          <p className="font-serif text-base text-ezme-black">{item.name}</p>
                          <p className="text-xs text-ezme-taupe font-sans">{item.selectedSize} · {item.selectedColor} · Qty {item.quantity}</p>
                        </div>
                        <p className="font-sans font-medium text-sm text-ezme-black">KES {(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-ezme-mist p-4 space-y-2 mb-6">
                    <div className="flex justify-between text-sm font-sans text-ezme-taupe">
                      <span>Deliver to</span>
                      <span className="text-ezme-black">{form.firstName} {form.lastName}, {form.county}</span>
                    </div>
                    <div className="flex justify-between text-sm font-sans text-ezme-taupe">
                      <span>Phone</span>
                      <span className="text-ezme-black">{form.phone}</span>
                    </div>
                    <div className="flex justify-between text-sm font-sans text-ezme-taupe">
                      <span>Payment</span>
                      <span className="text-ezme-black capitalize">{payMethod === 'mpesa' ? 'M-PESA' : 'WhatsApp'}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setStep(2)} className="btn-outline px-6 py-4 text-xs">Back</button>
                    <button
                      onClick={handleOrder}
                      disabled={processing}
                      className="btn-dark flex-1 py-4 text-xs flex items-center justify-center gap-2"
                    >
                      {processing ? (
                        <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...</>
                      ) : 'Place Order'}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Order summary */}
          <div>
            <div className="bg-white p-6 shadow-sm sticky top-28">
              <h3 className="font-serif text-xl font-light mb-5">Order Summary</h3>
              <div className="space-y-3 mb-5 max-h-60 overflow-y-auto">
                {items.map(item => (
                  <div key={item.key} className="flex gap-3">
                    <div className="relative">
                      <img src={item.images[0]} alt={item.name} className="w-14 h-16 object-cover bg-ezme-mist" />
                      <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 bg-ezme-black text-white text-[9px] rounded-full flex items-center justify-center font-sans w-[18px] h-[18px]">{item.quantity}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-sans text-ezme-black font-medium truncate">{item.name}</p>
                      <p className="text-[10px] text-ezme-taupe font-sans">{item.selectedSize}</p>
                    </div>
                    <p className="text-xs font-sans font-medium text-ezme-black whitespace-nowrap">KES {(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm font-sans text-ezme-taupe">
                  <span>Subtotal</span>
                  <span className="text-ezme-black">KES {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-sans text-ezme-taupe">
                  <span>Delivery</span>
                  <span className="text-ezme-black">KES {delivery}</span>
                </div>
                <div className="flex justify-between font-serif text-lg pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span>KES {total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
