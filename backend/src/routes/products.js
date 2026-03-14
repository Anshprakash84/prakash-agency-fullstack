const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { protect, adminOnly } = require("../middleware/auth");
const upload = require("../middleware/upload");

router.get("/", async (req, res) => {
  try {
    const { category, search, featured, page = 1, limit = 12 } = req.query;
    const query = {};
    if (category) query.category = category;
    if (featured) query.featured = featured === "true";
    if (search) query.$text = { $search: search };
    const skip = (page - 1) * limit;
    const total = await Product.countDocuments(query);
    const products = await Product.find(query).populate("category", "name slug color icon").sort({ createdAt: -1 }).skip(skip).limit(Number(limit));
    res.json({ success: true, data: products, total, pages: Math.ceil(total / limit), currentPage: Number(page) });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.json({ success: true, data: product });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post("/", protect, adminOnly, upload.single("image"), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image = "/uploads/" + req.file.filename;
    const product = await Product.create(data);
    res.status(201).json({ success: true, data: product });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.put("/:id", protect, adminOnly, upload.single("image"), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image = "/uploads/" + req.file.filename;
    const product = await Product.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.json({ success: true, data: product });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Product deleted" });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
