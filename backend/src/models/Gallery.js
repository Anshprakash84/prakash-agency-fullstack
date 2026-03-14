const mongoose = require("mongoose");
const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  imageUrl: { type: String, required: true },
  category: { type: String, enum: ["products", "warehouse", "operations", "apartment", "team"], default: "products" },
  featured: { type: Boolean, default: false },
}, { timestamps: true });
module.exports = mongoose.model("Gallery", gallerySchema);