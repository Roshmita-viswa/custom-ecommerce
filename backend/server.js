import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './src/Product.js';

dotenv.config();
const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.get('/api/products', async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.category && req.query.category !== 'All') filter.category = req.query.category;
    if (req.query.search) {
      const search = String(req.query.search).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } }
      ];
    }
    res.json(await Product.find(filter).sort({ name: 1 }).limit(100).lean());
  } catch (err) { next(err); }
});

app.post('/api/orders', async (req, res, next) => {
  try {
    const { name, email, items } = req.body;
    if (!name?.trim() || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email || ''))
      return res.status(400).json({ message: 'Enter a valid name and email.' });
    if (!Array.isArray(items) || !items.length)
      return res.status(400).json({ message: 'Your cart is empty.' });
    // Demo endpoint only. No payment is collected and no real order is fulfilled.
    res.status(201).json({ message: 'Demo checkout received. No payment was taken.', reference: 'DEMO-' + Date.now().toString().slice(-6), itemCount: items.length });
  } catch (err) { next(err); }
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error. Check the backend terminal.' });
});

const port = Number(process.env.PORT || 5000);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/custom_ecommerce')
  .then(() => app.listen(port, () => console.log(`API running at http://localhost:${port}`)))
  .catch((err) => { console.error('MongoDB connection failed:', err.message); process.exit(1); });
