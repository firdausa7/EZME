import { Router } from 'express';
import pool from '../db/index.js';

const router = Router();

router.post('/', async (req, res) => {
  const {
    customerName, customerPhone, customerEmail,
    county, address, notes,
    items, subtotal, delivery, total,
    paymentMethod,
  } = req.body;

  if (!customerName || !customerPhone || !items?.length) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const orderNumber = `EZME-${Date.now().toString().slice(-6)}`;

  try {
    const { rows } = await pool.query(
      `INSERT INTO orders
         (order_number, customer_name, customer_phone, customer_email,
          county, address, notes, items, subtotal, delivery, total, payment_method)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
       RETURNING id, order_number, status, created_at`,
      [orderNumber, customerName, customerPhone, customerEmail,
       county, address, notes, JSON.stringify(items),
       subtotal, delivery, total, paymentMethod]
    );
    res.status(201).json({ orderNumber: rows[0].order_number, status: rows[0].status });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

export default router;
