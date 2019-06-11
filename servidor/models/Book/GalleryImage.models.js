const mongoose = require('mongoose')
const Schema = mongoose.Schema

const galleryImageSchema = new Schema({
  name: String,
  tags: Array,
  status: {
    type: String,
    enum: ["background", "character"]
  },
  imageURL: String
}, {
    timestamps: true
  })

const GalleryImage = mongoose.model('GalleryImage', galleryImageSchema)
module.exports = GalleryImage


