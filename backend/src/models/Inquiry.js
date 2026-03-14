const mongoose = require("mongoose");
const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: "" },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ["general", "apartment", "product", "business"], default: "general" },
  status: { type: String, enum: ["new", "read", "replied"], default: "new" },
}, { timestamps: true });
module.exports = mongoose.model("Inquiry", inquirySchema);