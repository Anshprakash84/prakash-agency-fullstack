const express = require("express");
const router = express.Router();
const Apartment = require("../models/Apartment");
const { protect, adminOnly } = require("../middleware/auth");
const upload = require("../middleware/upload");

router.get("/", async (req, res) => {
  try {
    let apt = await Apartment.findOne();
    if (!apt) apt = await Apartment.create({
      name: "Prakash Apartment",
      description: "A premium residential property offering modern living spaces with world-class amenities.",
      address: "Prakash Nagar, Main Road, Latehar, Jharkhand - 829206",
      totalFloors: 5, totalUnits: 20,
      amenities: ["24/7 Security", "Power Backup", "Parking", "Water Supply", "Lift", "CCTV Surveillance"],
      images: [],
      rooms: [
        { type: "1 BHK", size: "550 sq ft", rent: 8000, available: true, description: "Cozy 1 bedroom apartment" },
        { type: "2 BHK", size: "850 sq ft", rent: 12000, available: true, description: "Spacious 2 bedroom apartment" },
        { type: "3 BHK", size: "1200 sq ft", rent: 18000, available: false, description: "Luxury 3 bedroom apartment" },
      ],
      contactPhone: "+91 98765 43210",
      contactEmail: "apartment@prakashagency.com",
    });
    res.json({ success: true, data: apt });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.put("/", protect, adminOnly, upload.array("images", 10), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.body.rooms && typeof req.body.rooms === "string") {
      data.rooms = JSON.parse(req.body.rooms);
    }
    if (req.files && req.files.length > 0) {
      data.images = req.files.map(f => "/uploads/" + f.filename);
    }
    let apt = await Apartment.findOne();
    if (apt) { Object.assign(apt, data); await apt.save(); }
    else apt = await Apartment.create(data);
    res.json({ success: true, data: apt });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
