const multer = require('multer');
const path = require('path');

// ✅ Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // folder for saving uploaded files
  },
  filename: (req, file, cb) => {
    // unique filename: timestamp + extension
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

// ✅ File filter (optional – only allow images)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.test(ext)) cb(null, true);
  else cb(new Error('Only image files are allowed!'));
};

// ✅ Multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // limit 5 MB
});

module.exports = upload;
