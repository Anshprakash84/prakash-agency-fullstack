const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const { protect, adminOnly } = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json({ success: true, data: categories });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const { name, description, icon, color } = req.body;
    const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const category = await Category.create({ name, slug, description, icon, color });
    res.status(201).json({ success: true, data: category });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });
    res.json({ success: true, data: category });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Category deleted" });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
