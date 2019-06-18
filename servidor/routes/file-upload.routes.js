const express = require('express');
const router = express.Router();
const GalleryImage = require('../models/Book/GalleryImage.models')
// const User = require ('../models/User')
const Book = require("../models/Book/Book.model")
const uploader = require('../configs/cloudinary.configs');
const uploaderPage = require('../configs/cloudinaryPages.configs')

router.post('/galeria/upload', uploader.single("imageUrl"), (req, res, next) => {

  console.log(req.file)

  if (!req.file) {
    res.status(500).json({ msg: 'No file uploaded!' })
    return;
  }

  const { originalname, secure_url } = { ...req.file }
  console.log(req.body)
  GalleryImage.findOne({ name: originalname })
    .then(image => {
      if (image) {
        res.json({ imageURL: image.imageURL, name: image.name, id: image._id })
      } else {
        GalleryImage.create([{ name: originalname, imageURL: secure_url, status: req.body.status }])
          .then(data => {
            console.log(data)
            res.json({ imageURL: data[0].imageURL, name: data[0].name, id: data[0]._id });
          })
          .catch(err => console.log('Error:', err))
      }
    })

})


router.post('/cuentos/upload/page/:id', uploaderPage.single('imageUrl'), (req, res, next) => {

  if (!req.file) {
    res.status(500).json({ msg: 'No file uploaded!' })
    return;
  }

  const { secure_url } = { ...req.file }
  const bookId = req.params.id

  Book.findByIdAndUpdate(bookId, { $push: { pagesToView: secure_url } }, { new: true })
    .then(book => {
      res.status(200).json(book);
    })
    .catch(err => {
      console.log(err);
      res.status(403).json(err)
    })

})

module.exports = router;