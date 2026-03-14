const mongoose = require('mongoose');

const apartmentSchema = new mongoose.Schema({
  name: { type: String, default: 'Prakash Apartment' },
  tagline: { type: String },
  description: { type: String },
  address: { type: String },
  location: {
    lat: { type: Number, default: 23.8103 },
    lng: { type: Number, default: 86.4297 }
  },
  totalFloors: { type: Number },
  totalUnits: { type: Number },
  yearBuilt: { type: Number },
  amenities: [{ type: String }],
  features: [{ name: String, description: String, icon: String }],
  rooms: [{
    type: { type: String },
    size: { type: String },
    price: { type: Number },
    description: { type: String },
    available: { type: Boolean, default: true },
    images: [{ type: String }]
  }],
  images: [{ type: String }],
  heroImage: { type: String },
  contactPhone: { type: String },
  contactEmail: { type: String },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Apartment', apartmentSchema);
