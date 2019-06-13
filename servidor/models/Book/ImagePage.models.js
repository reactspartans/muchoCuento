const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imagePageSchema = new Schema({
  name: { type: Schema.Types.ObjectId, ref: 'GalleryImage' },
  positionX: Number,
  positionY: Number,
  scaleX: Number,
  scaleY: Number,
  rotation: Number,
  status: String,
  imageURL: String,

},
  {
    timestamps: true
  })

const ImagePage = mongoose.model('ImagePage', imagePageSchema)
module.exports = ImagePage