const mongoose = require("mongoose");
const apartmentSchema = new mongoose.Schema({
  name: { type: String, default: "Prakash Apartment" },
  description: { type: String, default: "" },
  address: { type: String, default: "" },
  totalFloors: { type: Number, default: 5 },
  totalUnits: { type: Number, default: 20 },
  amenities: [{ type: String }],
  images: [{ type: String }],
  rooms: [{
    type: { type: String },
    size: { type: String },
    rent: { type: Number },
    available: { type: Boolean, default: true },
    description: { type: String },
  }],
  contactPhone: { type: String },
  contactEmail: { type: String },
}, { timestamps: true });
module.exports = mongoose.model("Apartment", apartmentSchema);