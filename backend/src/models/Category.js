const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, default: "" },
  icon: { type: String, default: "" },
  color: { type: String, default: "#FF6B35" },
}, { timestamps: true });
module.exports = mongoose.model("Category", categorySchema);