const mongoose = require('mongoose')
const Schema = mongoose.Schema

const textPageSchema = new Schema({
  name: { type: Schema.Types.ObjectId, ref: 'GalleryImage' },
  content: String,
  positionX: Number,
  positionY: Number,
  scaleX: Number,
  scaleY: Number,
  color: String
},
  {
    timestamps: true
  })

const TextPage = mongoose.model('TextPage', textPageSchema)
module.exports = TextPage