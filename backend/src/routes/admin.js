import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db/index.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// ── Auth ──────────────────────────────────────────────────────────────────────

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }
  try {
    const { rows } = await pool.query(
      'SELECT * FROM admin_users WHERE email = $1', [email]
    );
    const user = rows[0];
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// ── Products (admin CRUD) ─────────────────────────────────────────────────────

router.get('/products', requireAuth, async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM products ORDER BY id');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

router.post('/products', requireAuth, async (req, res) => {
  const { name, price, category, badge, thumbnail, video, images, colors, sizes, details, description, is_new, is_best_seller } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO products (name, price, category, badge, thumbnail, video, images, colors, sizes, details, description, is_new, is_best_seller)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *`,
      [name, price || 6000, category, badge, thumbnail, video,
       images || [], JSON.stringify(colors || []),
       sizes || ['54','56','58','60','62','Custom Made'],
       details || [], description, is_new || false, is_best_seller || false]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

router.put('/products/:id', requireAuth, async (req, res) => {
  const fields = ['name','price','category','badge','thumbnail','video','images','colors','sizes','details','description','is_new','is_best_seller','archived'];
  const updates = [];
  const values = [];
  let i = 1;
  for (const f of fields) {
    if (req.body[f] !== undefined) {
      updates.push(`${f} = $${i++}`);
      values.push(f === 'colors' ? JSON.stringify(req.body[f]) : req.body[f]);
    }
  }
  if (!updates.length) return res.status(400).json({ error: 'No fields to update' });
  values.push(req.params.id);
  try {
    const { rows } = await pool.query(
      `UPDATE products SET ${updates.join(', ')} WHERE id = $${i} RETURNING *`,
      values
    );
    if (!rows[0]) return res.status(404).json({ error: 'Product not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

router.delete('/products/:id', requireAuth, async (req, res) => {
  try {
    await pool.query('UPDATE products SET archived = true WHERE id = $1', [req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// ── Orders (admin) ────────────────────────────────────────────────────────────

router.get('/orders', requireAuth, async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

router.put('/orders/:id', requireAuth, async (req, res) => {
  const { status, payment_ref } = req.body;
  try {
    const { rows } = await pool.query(
      `UPDATE orders SET
         status = COALESCE($1, status),
         payment_ref = COALESCE($2, payment_ref),
         updated_at = NOW()
       WHERE id = $3 RETURNING *`,
      [status, payment_ref, req.params.id]
    );
    if (!rows[0]) return res.status(404).json({ error: 'Order not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// ── Dashboard stats ───────────────────────────────────────────────────────────

router.get('/dashboard', requireAuth, async (req, res) => {
  try {
    const [orders, products, revenue] = await Promise.all([
      pool.query('SELECT COUNT(*) FROM orders'),
      pool.query('SELECT COUNT(*) FROM products WHERE archived = false'),
      pool.query("SELECT COALESCE(SUM(total),0) FROM orders WHERE status != 'cancelled'"),
    ]);
    res.json({
      totalOrders: parseInt(orders.rows[0].count),
      totalProducts: parseInt(products.rows[0].count),
      totalRevenue: parseInt(revenue.rows[0].coalesce),
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

export default router;
