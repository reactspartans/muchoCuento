const express = require('express')
const router = express.Router()

const Book = require('../models/Book/Book.model')

router.post('/newBook', (req, res) => {
  Book.create(req.body)
    .then(data => res.json(data))
    .catch(err => console.log('Error:', err))
})

router.get('/', (req, res) => {
  Book.find()
    .then(data => res.json(data))
    .catch(err => console.log('Error:', err))
})



module.exports = router;