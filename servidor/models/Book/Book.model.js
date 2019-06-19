const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
  name: String,
  pagesToView: [],
  creatorID: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
  })

const Book = mongoose.model('Book', bookSchema)
module.exports = Book