import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../ui/ProductCard';
import { products } from '../../data/products';

export default function NewArrivals() {
  const newProducts = products.filter(p => p.isNew);

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <p className="eyebrow mb-3">Just Dropped</p>
          <h2 className="section-heading">New Arrivals</h2>
          <span className="divider" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-12">
          {newProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/shop?filter=new" className="btn-outline px-12 py-4 text-xs">View All New Arrivals</Link>
        </motion.div>
      </div>
    </section>
  );
}
