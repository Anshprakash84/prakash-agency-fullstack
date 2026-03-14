const express = require("express");
const router = express.Router();
const Gallery = require("../models/Gallery");
const { protect, adminOnly } = require("../middleware/auth");
const upload = require("../middleware/upload");

router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const images = await Gallery.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: images });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post("/", protect, adminOnly, upload.single("image"), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.imageUrl = "/uploads/" + req.file.filename;
    const image = await Gallery.create(data);
    res.status(201).json({ success: true, data: image });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Image deleted" });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
