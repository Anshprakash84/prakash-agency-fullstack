const express = require("express");
const router = express.Router();
const Inquiry = require("../models/Inquiry");
const { protect, adminOnly } = require("../middleware/auth");

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, subject, message, type } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: "All required fields must be filled" });
    }
    const inquiry = await Inquiry.create({ name, email, phone, subject, message, type });
    res.status(201).json({ success: true, data: inquiry, message: "Inquiry submitted successfully" });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const { status, type, page = 1, limit = 20 } = req.query;
    const query = {};
    if (status) query.status = status;
    if (type) query.type = type;
    const skip = (page - 1) * limit;
    const total = await Inquiry.countDocuments(query);
    const inquiries = await Inquiry.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit));
    res.json({ success: true, data: inquiries, total });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.put("/:id/status", protect, adminOnly, async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json({ success: true, data: inquiry });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Inquiry deleted" });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
