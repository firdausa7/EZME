import { motion } from 'framer-motion';

const ProductGrid = () => {
  const products = [
    {
      id: 1,
      name: "Nocturne",
      price: "$289",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
    },
    {
      id: 2,
      name: "Verdant", 
      price: "$349",
      image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&auto=format&fit=crop&w=686&q=80"
    },
    {
      id: 3,
      name: "Dawn",
      price: "$279",
      image: "https://images.unsplash.com/photo-1584633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
    }
  ];

  return (
    <section className="featured-products" id="collections">
      <div className="container">
        <div className="section-title">
          <h2>Signature Collection</h2>
        </div>
        <div className="products-grid">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="product-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="product-img">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-price">{product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;