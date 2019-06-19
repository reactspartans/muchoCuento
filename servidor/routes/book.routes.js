const express = require('express')
const router = express.Router()
const TextPage = require('../models/Book/TextPage.models')
const Book = require('../models/Book/Book.model')
const Page = require('../models/Book/Page.models')

//Crear un cuento nuevo
router.post('/newBook', (req, res) => {
  // console.log(req.body, 'back')

  const newBook = { name, pagesToView } = req.body
  newBook.creatorID = req.user._id;
  Book.create(newBook)
    .then(data => {
      // console.log(data)
      res.json(data)
    }
    )
    .catch(err => console.log('Error:', err))
})


//lista de cuentos
router.get('/', (req, res) => {
  Book.find()
    .then(data => res.json(data))
    .catch(err => console.log('Error:', err))
})


//detalles cuento
router.get('/:id', (req, res) => {
  const id = req.params.id
  Book.findById(id)
    .then(data => res.json(data))
    .catch(err => console.log('Error:', err))
})


//añadir una pagina al cuento
router.post('/addPage', (req, res) => {
  // console.log('----------entro ruta salvar page------------', req.body)
  const newPage = { bookId, texts, imageBackground, imageCharacters } = req.body;
  newPage.pageNumber = 0
  Page.find({ bookId })
    .then(cosa => {
      console.log(cosa)
      newPage.pageNumber = cosa.length + 1
      Page.create(newPage)
        .then(data => {
          // console.log(data)
          res.json(data)
        })
    })


    .catch(err => console.log('Error', err))
})


//editar pagina cuento
router.get('/edit/:book_id', (req, res) => {
  const bookId = req.params.book_id
  // console.log(bookId)
  Page.find({ book_id: bookId })
    .populate('texts')
    .populate('ImageCharPage')
    .then(data => {

      console.log(data)
      res.json(data)
    })
    .catch(error => console.log(error))
})


/* router.post('/edit/:book_id', (req, res) => {
  const { book_id, texts, imageBackground, imageCharacters, pageNumber } = req.body

  Page.findByIdAndUpdate({ _id: req.params.trip_id }, { $set: { book_id, texts, imageBackground, imageCharacters, pageNumber } })
    .then(theTrip => res.redirect(`/trip/detail/${theTrip._id}`))
    .catch(error => console.log(error))
})
 */



//añadir un texto al modelo texto
router.post('/addText', (req, res) => {
  // console.log('entro en la ruta de addText')
  const newText = { name, content, positionX, positionY, scaleX, scaleY, rotation, color } = req.body;
  // console.log(req.body, 'ruta addText')
  TextPage.create(newText)
    .then(data => {
      // console.log(newText, 'creado base datos text')
      res.json(data)
    })
    .catch(err => console.log('Error:', err))
})


module.exports = router;