import 'dotenv/config';
import bcrypt from 'bcryptjs';
import pool from './index.js';

const SIZES = ['54', '56', '58', '60', '62', 'Custom Made'];

const products = [
  { id: 1, name: 'Grey Marble Cape Abaya', category: 'occasion', badge: 'New Arrival', thumbnail: '/thumbs/reel1_mid.jpg', video: '/videos/reel1.mp4', images: ['/thumbs/reel1_mid.jpg', '/thumbs/reel1.jpg'], colors: [{ name: 'Grey Marble', hex: '#9E9E9E' }], description: 'An ethereal cape-style abaya in grey marble silk.', details: ['Marble-print silk fabric', 'Attached cape overlay', 'Full-length silhouette', 'Occasion & evening wear'], rating: 5.0, reviews: 34, is_new: true, is_best_seller: true },
  { id: 2, name: 'Lavender Floral Print Abaya', category: 'everyday', badge: 'Best Seller', thumbnail: '/thumbs/reel2_mid.jpg', video: '/videos/reel2.mp4', images: ['/thumbs/reel2_mid.jpg', '/thumbs/reel2.jpg'], colors: [{ name: 'Cream & Lavender', hex: '#E6E0F5' }], description: 'Delicate lavender florals bloom across a cream base.', details: ['Floral print chiffon', 'Open-front kimono silhouette', 'Lightweight & breathable'], rating: 4.9, reviews: 87, is_new: true, is_best_seller: true },
  { id: 3, name: 'Nude Floral Abaya', category: 'everyday', badge: 'Fan Favourite', thumbnail: '/thumbs/reel3_mid.jpg', video: '/videos/reel3.mp4', images: ['/thumbs/reel3_mid.jpg', '/thumbs/reel3.jpg'], colors: [{ name: 'Nude Floral', hex: '#E8D5C4' }], description: 'Subtle floral embroidery on a nude canvas.', details: ['Embroidered details', 'Relaxed silhouette', 'Everyday wear'], rating: 4.8, reviews: 62, is_new: false, is_best_seller: true },
  { id: 4, name: 'Navy Feather Print Abaya', category: 'occasion', badge: 'New Arrival', thumbnail: '/thumbs/reel4_mid.jpg', video: '/videos/reel4.mp4', images: ['/thumbs/reel4_mid.jpg', '/thumbs/reel4.jpg'], colors: [{ name: 'Navy', hex: '#1B2A4A' }], description: 'Bold navy feather print for statement occasions.', details: ['Feather-print fabric', 'Wide-sleeve silhouette', 'Occasion wear'], rating: 4.7, reviews: 28, is_new: true, is_best_seller: false },
  { id: 5, name: 'Sage Green Butterfly Abaya', category: 'luxury', badge: 'Best Seller', thumbnail: '/thumbs/reel5_mid.jpg', video: '/videos/reel5.mp4', images: ['/thumbs/reel5_mid.jpg', '/thumbs/reel5.jpg'], colors: [{ name: 'Sage Green', hex: '#8FAF8F' }], description: 'Sage green luxury abaya with butterfly motifs.', details: ['Premium fabric', 'Butterfly embellishments', 'Luxury collection'], rating: 4.9, reviews: 91, is_new: false, is_best_seller: true },
  { id: 6, name: 'Cream Botanical Abaya', category: 'everyday', badge: 'Fan Favourite', thumbnail: '/thumbs/reel6_mid.jpg', video: '/videos/reel6.mp4', images: ['/thumbs/reel6_mid.jpg', '/thumbs/reel6.jpg'], colors: [{ name: 'Cream', hex: '#FAF8F5' }], description: 'Botanical print on a soft cream base.', details: ['Botanical print', 'Flowing fit', 'Everyday luxury'], rating: 4.8, reviews: 45, is_new: false, is_best_seller: true },
  { id: 7, name: 'Ivory Crinkle Abaya', category: 'luxury', badge: 'New Arrival', thumbnail: '/thumbs/reel7_mid.jpg', video: '/videos/reel7.mp4', images: ['/thumbs/reel7_mid.jpg', '/thumbs/reel7.jpg'], colors: [{ name: 'Ivory', hex: '#F5F0E8' }], description: 'Textured crinkle fabric in warm ivory.', details: ['Crinkle texture', 'Relaxed luxury fit', 'Signature collection'], rating: 4.6, reviews: 19, is_new: true, is_best_seller: false },
  { id: 8, name: 'Terracotta Collar Abaya', category: 'everyday', badge: null, thumbnail: '/thumbs/reel8_mid.jpg', video: '/videos/reel8.mp4', images: ['/thumbs/reel8_mid.jpg', '/thumbs/reel8.jpg'], colors: [{ name: 'Terracotta', hex: '#C87941' }], description: 'Warm terracotta with a classic collar detail.', details: ['Collar neckline', 'Everyday classic', 'Premium cotton blend'], rating: 4.7, reviews: 31, is_new: false, is_best_seller: false },
  { id: 9, name: 'Teal Floral Embroidered Abaya', category: 'luxury', badge: null, thumbnail: '/thumbs/reel9_mid.jpg', video: '/videos/reel9.mp4', images: ['/thumbs/reel9_mid.jpg', '/thumbs/reel9.jpg'], colors: [{ name: 'Teal', hex: '#008080' }], description: 'Hand-embroidered floral motifs on rich teal.', details: ['Hand embroidery', 'Luxury fabric', 'Signature collection'], rating: 4.9, reviews: 24, is_new: false, is_best_seller: false },
  { id: 10, name: 'Blush Coral Tree Print Abaya', category: 'occasion', badge: null, thumbnail: '/thumbs/reel10_mid.jpg', video: '/videos/reel10.mp4', images: ['/thumbs/reel10_mid.jpg', '/thumbs/reel10.jpg'], colors: [{ name: 'Blush Coral', hex: '#F08080' }], description: 'Artistic tree print in blush coral tones.', details: ['Tree print design', 'Occasion wear', 'Flowing silhouette'], rating: 4.8, reviews: 17, is_new: false, is_best_seller: false },
  { id: 11, name: 'Ivory Floral Sleeve Abaya', category: 'occasion', badge: null, thumbnail: '/thumbs/reel11_mid.jpg', video: '/videos/reel11.mp4', images: ['/thumbs/reel11_mid.jpg', '/thumbs/reel11.jpg'], colors: [{ name: 'Ivory', hex: '#FFFFF0' }], description: 'Floral-embellished sleeves on crisp ivory.', details: ['Floral sleeve detail', 'Occasion wear', 'Classic ivory'], rating: 4.7, reviews: 22, is_new: false, is_best_seller: false },
  { id: 12, name: 'White Butterfly Summer Abaya', category: 'everyday', badge: 'Summer Edit', thumbnail: '/thumbs/reel12_mid.jpg', video: '/videos/reel12.mp4', images: ['/thumbs/reel12_mid.jpg', '/thumbs/reel12.jpg'], colors: [{ name: 'White', hex: '#FFFFFF' }], description: 'Light and airy white abaya perfect for summer.', details: ['Lightweight fabric', 'Summer collection', 'Butterfly print'], rating: 4.8, reviews: 39, is_new: false, is_best_seller: false },
  { id: 14, name: 'Olive Satin Abaya', category: 'luxury', badge: null, thumbnail: '/thumbs/reel14_mid.jpg', video: '/videos/reel14.mp4', images: ['/thumbs/reel14_mid.jpg', '/thumbs/reel14.jpg'], colors: [{ name: 'Olive', hex: '#808000' }], description: 'Satin-finish olive luxury abaya.', details: ['Satin fabric', 'Luxury finish', 'Signature collection'], rating: 4.9, reviews: 14, is_new: false, is_best_seller: false },
  { id: 15, name: 'Grey Speckled Kimono Abaya', category: 'everyday', badge: null, thumbnail: '/thumbs/reel15_mid.jpg', video: '/videos/reel15.mp4', images: ['/thumbs/reel15_mid.jpg', '/thumbs/reel15.jpg'], colors: [{ name: 'Grey Speckled', hex: '#888888' }], description: 'Casual kimono-style in grey speckled print.', details: ['Kimono silhouette', 'Everyday wear', 'Relaxed fit'], rating: 4.6, reviews: 28, is_new: false, is_best_seller: false },
  { id: 16, name: 'Terracotta Feather Print Abaya', category: 'occasion', badge: null, thumbnail: '/thumbs/reel16_mid.jpg', video: '/videos/reel16.mp4', images: ['/thumbs/reel16_mid.jpg', '/thumbs/reel16.jpg'], colors: [{ name: 'Terracotta', hex: '#C87941' }], description: 'Feather print in warm terracotta tones.', details: ['Feather print', 'Occasion wear', 'Warm palette'], rating: 4.7, reviews: 18, is_new: false, is_best_seller: false },
  { id: 17, name: 'Black Polka Dot Abaya', category: 'everyday', badge: 'Fan Favourite', thumbnail: '/thumbs/reel17_mid.jpg', video: '/videos/reel17.mp4', images: ['/thumbs/reel17_mid.jpg', '/thumbs/reel17.jpg'], colors: [{ name: 'Black & White', hex: '#1A1A1A' }], description: 'Classic black with white polka dots.', details: ['Polka dot print', 'Classic everyday', 'Versatile styling'], rating: 4.8, reviews: 56, is_new: false, is_best_seller: true },
  { id: 18, name: 'Mustard Lace Kimono Abaya', category: 'luxury', badge: null, thumbnail: '/thumbs/reel18_mid.jpg', video: '/videos/reel18.mp4', images: ['/thumbs/reel18_mid.jpg', '/thumbs/reel18.jpg'], colors: [{ name: 'Mustard', hex: '#FFDB58' }], description: 'Lace-detailed kimono in rich mustard.', details: ['Lace detailing', 'Kimono cut', 'Luxury collection'], rating: 4.9, reviews: 11, is_new: false, is_best_seller: false },
  { id: 19, name: 'Copper Ditsy Floral Abaya', category: 'everyday', badge: null, thumbnail: '/thumbs/reel19_mid.jpg', video: '/videos/reel19.mp4', images: ['/thumbs/reel19_mid.jpg', '/thumbs/reel19.jpg'], colors: [{ name: 'Copper', hex: '#B87333' }], description: 'Tiny floral ditsy print in warm copper tones.', details: ['Ditsy floral print', 'Everyday wear', 'Warm copper palette'], rating: 4.7, reviews: 20, is_new: false, is_best_seller: false },
];

async function seed() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    for (const p of products) {
      await client.query(
        `INSERT INTO products (id, name, price, category, badge, thumbnail, video, images, colors, sizes, details, description, rating, reviews, is_new, is_best_seller)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
         ON CONFLICT (id) DO UPDATE SET
           name=$2, price=$3, category=$4, badge=$5, thumbnail=$6, video=$7,
           images=$8, colors=$9, sizes=$10, details=$11, description=$12,
           rating=$13, reviews=$14, is_new=$15, is_best_seller=$16`,
        [p.id, p.name, 6000, p.category, p.badge, p.thumbnail, p.video,
         p.images, JSON.stringify(p.colors), SIZES, p.details,
         p.description, p.rating, p.reviews, p.is_new, p.is_best_seller]
      );
    }

    // Default admin user (change password via admin settings)
    const hash = await bcrypt.hash('ezme2025', 12);
    await client.query(
      `INSERT INTO admin_users (email, password_hash, name, role)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (email) DO NOTHING`,
      ['admin@ezme.ke', hash, 'EZME Admin', 'super-admin']
    );

    await client.query('SELECT setval(\'products_id_seq\', (SELECT MAX(id) FROM products))');
    await client.query('COMMIT');
    console.log(`✓ Seeded ${products.length} products and default admin`);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Seed failed:', err.message);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
