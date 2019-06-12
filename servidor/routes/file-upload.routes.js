const express = require('express');
const router = express.Router();
const GalleryImage = require('../models/Book/GalleryImage.models')

const uploader = require('../configs/cloudinary.configs');

router.post('/upload', uploader.single("imageUrl"), (req, res, next) => {

  if (!req.file) {
    res.status(500).json({ msg: 'No file uploaded!' })
    return;
  }

  const { originalname, secure_url } = req.file
  GalleryImage.create([{ name: originalname, imageURL: secure_url }])
    .then(data => res.json(data))
    .catch(err => console.log('Error:', err))

  console.log(req.file)
  res.json({ imageURL, name, id: id });
})

module.exports = router;