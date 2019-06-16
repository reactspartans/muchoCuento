const express = require('express')
const router = express.Router()
const TextPage = require('../models/Book/TextPage.models')
const Book = require('../models/Book/Book.model')


//Crear un cuento nuevo
router.post('/newBook', (req, res) => {
  console.log(req.body, 'back')
  Book.create(req.body)
    .then(data=>res.json(data))
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
    .then(data => res.jason(data))
    .catch(err => console.log('Error:', err))
})


//añadir una pagina al cuento
/* router.post('/addPage/:id', (req, res) => {  //id del book al que pertenece
  const { id } = req.params;
  const newPage = { positionX, positionY } = req.body;
  newPage.book = id;   //le guardamos el id del book al que pertenece
}) */


//añadir un texto al modelo texto
router.post('/addText', (req, res) => {
  console.log('entro en la ruta de addText')
  const newText = { content, positionX, positionY } = req.body;
  console.log(req.body, 'ruta addText')
  TextPage.create(newText)
    .then(data => {
      console.log(newText, 'creado base datos text')
      res.json(data)
    })
    .catch(err => console.log('Error:', err))
})


module.exports = router;