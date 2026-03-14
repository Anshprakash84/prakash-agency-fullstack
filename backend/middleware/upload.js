const multer = require('multer');
const path = require('path');
const fs = require('fs');

const createStorage = (uploadPath) => multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '..', 'uploads', uploadPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) cb(null, true);
  else cb(new Error('Only image files are allowed!'), false);
};

const uploadProduct = multer({ storage: createStorage('products'), fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });
const uploadApartment = multer({ storage: createStorage('apartment'), fileFilter, limits: { fileSize: 10 * 1024 * 1024 } });
const uploadGallery = multer({ storage: createStorage('gallery'), fileFilter, limits: { fileSize: 10 * 1024 * 1024 } });

module.exports = { uploadProduct, uploadApartment, uploadGallery };
