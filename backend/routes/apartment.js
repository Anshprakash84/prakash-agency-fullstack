const express = require('express');
const Apartment = require('../models/Apartment');
const { authenticate } = require('../middleware/auth');
const { uploadApartment } = require('../middleware/upload');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let apartment = await Apartment.findOne();
    if (!apartment) {
      apartment = await Apartment.create({
        name: 'Prakash Apartment',
        tagline: 'Modern Living, Premium Comfort',
        description: 'Prakash Apartment is a premium residential property offering modern amenities and comfortable living spaces in a prime location. A subsidiary of Prakash Agency, our apartments are designed for families and individuals who value quality living.',
        address: 'Prakash Apartment, Near Bus Stand, Latehar, Jharkhand - 829206',
        totalFloors: 5, totalUnits: 30, yearBuilt: 2018,
        amenities: ['24/7 Security', 'Power Backup', 'Parking', 'Lift/Elevator', 'Water Supply', 'CCTV Surveillance', 'Maintenance Staff', 'Garden Area'],
        contactPhone: '+91 98765 43210',
        contactEmail: 'apartment@prakashagency.com'
      });
    }
    res.json({ apartment });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch apartment info.' });
  }
});

router.put('/', authenticate, uploadApartment.array('images', 20), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.files && req.files.length > 0) {
      data.images = req.files.map(f => `/uploads/apartment/${f.filename}`);
      data.heroImage = data.images[0];
    }
    let apartment = await Apartment.findOne();
    if (!apartment) apartment = new Apartment(data);
    else Object.assign(apartment, data);
    apartment.updatedAt = new Date();
    await apartment.save();
    res.json({ apartment, message: 'Apartment updated successfully.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
