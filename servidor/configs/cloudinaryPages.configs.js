require("dotenv").config()
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'Paginas completas libros',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, file.originalname);
  }
})

const uploadCloud = multer({ storage: storage, limits: { fieldSize: 25 * 1024 * 1024 } });




module.exports = uploadCloud;