const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PageSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: 'Book' },
  texts: [{ type: Schema.Types.ObjectId, ref: 'TextPage' }],
  imageBackground: { type: Schema.Types.ObjectId, ref: 'ImagePage' },
  imageCharacter: [{ type: Schema.Types.ObjectId, ref: 'ImagePage' }],
  pageNumber: Number
},
  {
    timestamps: true
  })

const Page = mongoose.model('Page', PageSchema)
module.exports = Page