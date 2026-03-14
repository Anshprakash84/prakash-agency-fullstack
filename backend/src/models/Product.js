const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Number },
  unit: { type: String, default: "piece" },
  image: { type: String, default: "" },
  imageUrl: { type: String, default: "" },
  brand: { type: String, default: "" },
  inStock: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  tags: [{ type: String }],
}, { timestamps: true });
productSchema.index({ name: "text", description: "text", brand: "text" });
module.exports = mongoose.model("Product", productSchema);