const express = require('express');
const Inquiry = require('../models/Inquiry');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message, type } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Name, email, subject, and message are required.' });
    }
    const inquiry = new Inquiry({ name, email, phone, subject, message, type });
    await inquiry.save();
    res.status(201).json({ message: 'Inquiry submitted successfully. We will get back to you soon!', inquiry: { _id: inquiry._id } });
  } catch (error) {
    res.status(400).json({ error: error.message || 'Failed to submit inquiry.' });
  }
});

router.get('/', authenticate, async (req, res) => {
  try {
    const { status, type, page = 1, limit = 20 } = req.query;
    const query = {};
    if (status) query.status = status;
    if (type) query.type = type;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [inquiries, total] = await Promise.all([
      Inquiry.find(query).sort('-createdAt').skip(skip).limit(parseInt(limit)),
      Inquiry.countDocuments(query)
    ]);
    const unreadCount = await Inquiry.countDocuments({ isRead: false });
    res.json({ inquiries, total, unreadCount, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inquiries.' });
  }
});

router.put('/:id', authenticate, async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, { ...req.body, isRead: true }, { new: true });
    if (!inquiry) return res.status(404).json({ error: 'Inquiry not found.' });
    res.json({ inquiry, message: 'Inquiry updated.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Inquiry deleted.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete inquiry.' });
  }
});

module.exports = router;
