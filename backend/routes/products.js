const express = require('express');
const Product = require('../models/Product');
const { authenticate } = require('../middleware/auth');
const { uploadProduct } = require('../middleware/upload');

const router = express.Router();

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const { category, search, featured, page = 1, limit = 20, sort = '-createdAt' } = req.query;
    const query = { isActive: true };
    if (category && category !== 'all') query.category = category;
    if (featured === 'true') query.isFeatured = true;
    if (search) query.$text = { $search: search };
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [products, total] = await Promise.all([
      Product.find(query).populate('category', 'name slug color icon').sort(sort).skip(skip).limit(parseInt(limit)),
      Product.countDocuments(query)
    ]);
    res.json({ products, total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products.' });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name slug color');
    if (!product) return res.status(404).json({ error: 'Product not found.' });
    res.json({ product });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product.' });
  }
});

// POST /api/products (admin)
router.post('/', authenticate, uploadProduct.array('images', 10), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.files && req.files.length > 0) {
      data.images = req.files.map(f => `/uploads/products/${f.filename}`);
      data.image = data.images[0];
    }
    const product = new Product(data);
    await product.save();
    await product.populate('category', 'name slug color');
    res.status(201).json({ product, message: 'Product created successfully.' });
  } catch (error) {
    res.status(400).json({ error: error.message || 'Failed to create product.' });
  }
});

// PUT /api/products/:id (admin)
router.put('/:id', authenticate, uploadProduct.array('images', 10), async (req, res) => {
  try {
    const data = { ...req.body, updatedAt: Date.now() };
    if (req.files && req.files.length > 0) {
      data.images = req.files.map(f => `/uploads/products/${f.filename}`);
      data.image = data.images[0];
    }
    const product = await Product.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true }).populate('category', 'name slug color');
    if (!product) return res.status(404).json({ error: 'Product not found.' });
    res.json({ product, message: 'Product updated successfully.' });
  } catch (error) {
    res.status(400).json({ error: error.message || 'Failed to update product.' });
  }
});

// DELETE /api/products/:id (admin)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found.' });
    res.json({ message: 'Product deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product.' });
  }
});

module.exports = router;
