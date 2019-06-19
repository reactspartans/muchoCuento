const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PageSchema = new Schema({
  bookId: { type: Schema.Types.ObjectId, ref: 'Book' },
  texts: [{ type: Schema.Types.ObjectId, ref: 'TextPage' }],
  imageBackground: { type: Schema.Types.ObjectId, ref: 'ImageBackPage' },
  imageCharacters: [{ type: Schema.Types.ObjectId, ref: 'ImageCharPage' }],
  pageNumber: Number
},
  {
    timestamps: true
  })

const Page = mongoose.model('Page', PageSchema)
module.exports = Page