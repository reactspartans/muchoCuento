const express = require('express')
const router = express.Router()

const GalleryImage = require('../models/Book/GalleryImage.models')
const ImagePage = require('../models/Book/ImagePage.models')


router.get('/', (req, res) => {
  GalleryImage.find()
    .then(data => res.json(data))
    .catch(err => console.log('Error:', err))
})

router.get('/:_id', (req, res) => {
  console.log(req.params._id)
  const id = req.params._id
  GalleryImage.findById(id)
    .then(data => res.json(data))
    .catch(err => console.log('Error:', err))
})

router.get('/addImageGallery', (req, res) => {
  GalleryImage.create(req.body)
    .then(data => res.json(data))
    .catch(err => console.log('Error:', err))
})

router.post('/addImagePage', (req, res) => {
  const { _id } = req.params;
  const newImage = { positionX, positionY } = req.body;
  newImage.name = _id;

  ImagePage.create(newImage)
    .then(data => res.json(data))
    .catch(err => console.log('Error:', err))
})





module.exports = router