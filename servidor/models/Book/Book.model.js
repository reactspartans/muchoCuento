const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
  name: String
},{
    timestamps: true
  })

const Book = mongoose.model('Book', bookSchema)
module.exports = Book