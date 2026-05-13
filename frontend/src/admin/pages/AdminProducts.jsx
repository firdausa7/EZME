import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Plus, Search, Filter, Archive, Edit2, Trash2, Copy,
  Package, AlertTriangle, CheckSquare, X, ChevronDown,
  Star, Tag, MoreVertical, Image, Save
} from 'lucide-react';
import { useAdminStore, useAdminAuth } from '../store/adminStore';
import toast from 'react-hot-toast';

const CATEGORIES = ['All', 'luxury', 'occasion', 'everyday'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

function StockBadge({ stock }) {
  if (stock === 0) return <span className="px-2 py-0.5 text-[10px] font-sans rounded-full bg-red-50 text-red-600">Out of Stock</span>;
  if (stock <= 5) return <span className="px-2 py-0.5 text-[10px] font-sans rounded-full bg-amber-50 text-amber-600">{stock} left</span>;
  return <span className="px-2 py-0.5 text-[10px] font-sans rounded-full bg-green-50 text-green-600">{stock} in stock</span>;
}

function ProductRow({ product, selected, onSelect, onEdit, onArchive, onDuplicate, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.tr layout className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
      <td className="px-4 py-3">
        <input type="checkbox" checked={selected} onChange={onSelect}
          className="rounded border-gray-300 text-[#0D0D0D] focus:ring-[#C9B8E8]" />
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <img src={product.thumbnail} alt={product.name}
              className="w-10 h-13 object-cover rounded-lg bg-gray-100"
              style={{ height: '52px' }} />
            {product.featured && (
              <Star size={10} className="absolute -top-1 -right-1 text-amber-400 fill-amber-400" />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-sans font-medium text-gray-900 truncate max-w-[180px]">{product.name}</p>
            <p className="text-[10px] text-gray-400 font-sans">{product.sku}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-[#C9B8E8]/20 text-[#7a6b9a] capitalize">{product.category}</span>
      </td>
      <td className="px-4 py-3 text-xs font-sans text-gray-900 font-medium">
        {product.price ? `KES ${product.price.toLocaleString()}` : <span className="text-gray-400">—</span>}
      </td>
      <td className="px-4 py-3"><StockBadge stock={product.stock} /></td>
      <td className="px-4 py-3">
        {product.archived
          ? <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">Archived</span>
          : <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-green-50 text-green-600">Active</span>}
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1.5">
          <button onClick={() => onEdit(product)}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Edit2 size={13} />
          </button>
          <div className="relative">
            <button onClick={() => setMenuOpen(s => !s)}
              className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreVertical size={13} />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-8 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 w-40 z-10">
                <button onClick={() => { onDuplicate(product); setMenuOpen(false); }}
                  className="flex items-center gap-2.5 w-full px-3 py-2 text-xs font-sans text-gray-700 hover:bg-gray-50">
                  <Copy size={12} /> Duplicate
                </button>
                <button onClick={() => { onArchive(product.id); setMenuOpen(false); }}
                  className="flex items-center gap-2.5 w-full px-3 py-2 text-xs font-sans text-gray-700 hover:bg-gray-50">
                  <Archive size={12} /> {product.archived ? 'Unarchive' : 'Archive'}
                </button>
                <hr className="my-1 border-gray-100" />
                <button onClick={() => { onDelete(product.id); setMenuOpen(false); }}
                  className="flex items-center gap-2.5 w-full px-3 py-2 text-xs font-sans text-red-600 hover:bg-red-50">
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </td>
    </motion.tr>
  );
}

function EditModal({ product, onClose, onSave }) {
  const [form, setForm] = useState({
    name: product?.name || '',
    price: product?.price || '',
    stock: product?.stock || 0,
    category: product?.category || 'everyday',
    sku: product?.sku || '',
    featured: product?.featured || false,
    sizes: product?.sizes || SIZES,
    description: product?.description || '',
  });

  const handleSave = () => {
    onSave(product?.id, { ...form, price: Number(form.price), stock: Number(form.stock) });
    onClose();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <motion.div initial={{ scale: 0.95, y: 16 }} animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-serif text-lg font-light text-gray-900">
            {product ? 'Edit Product' : 'Add Product'}
          </h2>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100">
            <X size={16} />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {product && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <img src={product.thumbnail} alt="" className="w-12 h-14 object-cover rounded-lg" />
              <div>
                <p className="text-xs font-sans font-medium text-gray-800">{product.name}</p>
                <p className="text-[10px] text-gray-400">{product.sku}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-[10px] font-sans text-gray-500 uppercase tracking-widest mb-1.5">Product Name</label>
              <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-sans outline-none focus:border-[#C9B8E8] focus:ring-2 focus:ring-[#C9B8E8]/20" />
            </div>
            <div>
              <label className="block text-[10px] font-sans text-gray-500 uppercase tracking-widest mb-1.5">Price (KES)</label>
              <input type="number" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))}
                placeholder="e.g. 5800"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-sans outline-none focus:border-[#C9B8E8] focus:ring-2 focus:ring-[#C9B8E8]/20" />
            </div>
            <div>
              <label className="block text-[10px] font-sans text-gray-500 uppercase tracking-widest mb-1.5">Stock Units</label>
              <input type="number" value={form.stock} onChange={e => setForm(p => ({ ...p, stock: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-sans outline-none focus:border-[#C9B8E8] focus:ring-2 focus:ring-[#C9B8E8]/20" />
            </div>
            <div>
              <label className="block text-[10px] font-sans text-gray-500 uppercase tracking-widest mb-1.5">Category</label>
              <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-sans outline-none focus:border-[#C9B8E8]">
                {['luxury', 'occasion', 'everyday'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-sans text-gray-500 uppercase tracking-widest mb-1.5">SKU</label>
              <input value={form.sku} onChange={e => setForm(p => ({ ...p, sku: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-sans outline-none focus:border-[#C9B8E8]" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-sans text-gray-500 uppercase tracking-widest mb-1.5">Description</label>
            <textarea rows={3} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-sans outline-none focus:border-[#C9B8E8] resize-none" />
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" id="featured" checked={form.featured}
              onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))}
              className="rounded border-gray-300 text-[#0D0D0D]" />
            <label htmlFor="featured" className="text-xs font-sans text-gray-700">Mark as Featured Product</label>
          </div>
        </div>

        <div className="flex gap-3 px-6 py-4 border-t border-gray-100">
          <button onClick={onClose}
            className="flex-1 border border-gray-200 text-gray-600 text-xs font-sans py-2.5 rounded-lg hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button onClick={handleSave}
            className="flex-1 bg-[#0D0D0D] text-white text-xs font-sans py-2.5 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
            <Save size={13} /> Save Changes
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function BulkPriceModal({ products, onClose, onSave }) {
  const [prices, setPrices] = useState(
    Object.fromEntries(products.map(p => [p.id, p.price || '']))
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <motion.div initial={{ scale: 0.95, y: 16 }} animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-serif text-lg font-light text-gray-900">Bulk Edit Prices</h2>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100"><X size={16} /></button>
        </div>
        <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
          {products.map(p => (
            <div key={p.id} className="flex items-center gap-3">
              <img src={p.thumbnail} alt="" className="w-9 h-11 object-cover rounded-lg shrink-0" />
              <p className="text-xs font-sans text-gray-700 flex-1 truncate">{p.name}</p>
              <div className="flex items-center gap-1 shrink-0">
                <span className="text-xs text-gray-400 font-sans">KES</span>
                <input type="number" value={prices[p.id]}
                  onChange={e => setPrices(pr => ({ ...pr, [p.id]: e.target.value }))}
                  className="w-24 border border-gray-200 rounded-lg px-2 py-1.5 text-xs font-sans outline-none focus:border-[#C9B8E8]" />
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-gray-100">
          <button onClick={onClose}
            className="flex-1 border border-gray-200 text-gray-600 text-xs font-sans py-2.5 rounded-lg hover:bg-gray-50">Cancel</button>
          <button onClick={() => { onSave(prices); onClose(); }}
            className="flex-1 bg-[#0D0D0D] text-white text-xs font-sans py-2.5 rounded-lg hover:bg-gray-800 flex items-center justify-center gap-2">
            <Save size={13} /> Apply Prices
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AdminProducts() {
  const { user } = useAdminAuth();
  const { products, updateProduct, addProduct, deleteProduct, archiveProduct } = useAdminStore();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [showArchived, setShowArchived] = useState(false);
  const [selected, setSelected] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showBulkPrice, setShowBulkPrice] = useState(false);

  const filtered = products.filter(p => {
    if (!showArchived && p.archived) return false;
    if (category !== 'All' && p.category !== category) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const allSelected = filtered.length > 0 && filtered.every(p => selected.includes(p.id));
  const toggleAll = () => setSelected(allSelected ? [] : filtered.map(p => p.id));
  const toggleOne = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const handleSave = (id, data) => {
    updateProduct(id, data);
    toast.success('Product updated');
  };

  const handleDelete = (id) => {
    if (!confirm('Delete this product?')) return;
    deleteProduct(id);
    toast.success('Product deleted');
  };

  const handleDuplicate = (product) => {
    addProduct({ ...product, id: undefined, name: `${product.name} (Copy)`, sku: `${product.sku}-CPY` });
    toast.success('Product duplicated');
  };

  const handleBulkArchive = () => {
    selected.forEach(id => archiveProduct(id));
    toast.success(`${selected.length} products archived`);
    setSelected([]);
  };

  const handleBulkPrice = (prices) => {
    Object.entries(prices).forEach(([id, price]) => updateProduct(Number(id), { price: Number(price) }));
    toast.success('Prices updated');
    setSelected([]);
  };

  const lowStock = products.filter(p => !p.archived && p.stock <= 5).length;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-light text-gray-900">Products</h1>
          <p className="text-xs font-sans text-gray-500 mt-0.5">{products.filter(p => !p.archived).length} active · {products.filter(p => p.archived).length} archived</p>
        </div>
        <div className="flex items-center gap-2">
          {user?.role === 'super_admin' && (
            <button onClick={() => { setEditProduct(null); setShowEdit(true); }}
              className="btn-dark px-4 py-2 text-[11px] rounded-lg flex items-center gap-1.5">
              <Plus size={13} /> Add Product
            </button>
          )}
        </div>
      </div>

      {/* Low stock warning */}
      {lowStock > 0 && (
        <div className="flex items-center gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          <AlertTriangle size={15} className="text-amber-500 shrink-0" />
          <p className="text-xs font-sans text-amber-700">
            <strong>{lowStock} product{lowStock > 1 ? 's' : ''}</strong> with low stock (5 units or fewer).
            <button onClick={() => {}} className="underline ml-1">View all →</button>
          </p>
        </div>
      )}

      {/* Toolbar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-50 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-48 relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-xs font-sans outline-none focus:border-[#C9B8E8] focus:ring-2 focus:ring-[#C9B8E8]/20" />
          </div>

          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCategory(c)}
                className={`text-[11px] font-sans px-3 py-2 capitalize transition-colors ${category === c ? 'bg-[#0D0D0D] text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
                {c}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 text-xs font-sans text-gray-600 cursor-pointer">
            <input type="checkbox" checked={showArchived} onChange={e => setShowArchived(e.target.checked)}
              className="rounded border-gray-300 text-[#0D0D0D]" />
            Show archived
          </label>
        </div>

        {/* Bulk actions */}
        {selected.length > 0 && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100">
            <span className="text-xs font-sans text-gray-600 font-medium">{selected.length} selected</span>
            <button onClick={handleBulkArchive}
              className="flex items-center gap-1.5 text-xs font-sans text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50">
              <Archive size={12} /> Archive
            </button>
            <button onClick={() => setShowBulkPrice(true)}
              className="flex items-center gap-1.5 text-xs font-sans text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50">
              <Tag size={12} /> Edit Prices
            </button>
            <button onClick={() => setSelected([])}
              className="ml-auto text-xs font-sans text-gray-400 hover:text-gray-600">
              Clear selection
            </button>
          </motion.div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-4 py-3 text-left">
                  <input type="checkbox" checked={allSelected} onChange={toggleAll}
                    className="rounded border-gray-300 text-[#0D0D0D]" />
                </th>
                {['Product', 'Category', 'Price', 'Stock', 'Status', ''].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-sans font-medium text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filtered.map(product => (
                  <ProductRow key={product.id} product={product}
                    selected={selected.includes(product.id)}
                    onSelect={() => toggleOne(product.id)}
                    onEdit={(p) => { setEditProduct(p); setShowEdit(true); }}
                    onArchive={archiveProduct}
                    onDuplicate={handleDuplicate}
                    onDelete={handleDelete} />
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <Package size={32} className="text-gray-200 mx-auto mb-3" />
              <p className="text-sm font-sans text-gray-400">No products found</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showEdit && (
          <EditModal product={editProduct} onClose={() => setShowEdit(false)} onSave={handleSave} />
        )}
        {showBulkPrice && (
          <BulkPriceModal
            products={products.filter(p => selected.includes(p.id))}
            onClose={() => setShowBulkPrice(false)}
            onSave={handleBulkPrice} />
        )}
      </AnimatePresence>
    </div>
  );
}
