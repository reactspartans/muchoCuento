const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imageSchema = new Schema({
  name: String,
  tags: Array,
  status: {
    type: String,
    enum: ["background", "character"]
  },
  imageURL: String
})

const Image = mongoose.model('Image', imageSchema)
module.exports = Image

