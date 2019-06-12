const express = require('express')
const router = express.Router()

const Book = require('../models/Book/Book.model')


//Crear un cuento nuevo
router.post('/newBook', (req, res) => {
  Book.create(req.body)
    .then(data => res.json(data))
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
router.post('/addPage/:id', (req, res) => {  //id del book al que pertenece
  const { id } = req.params;
  const newPage = { positionX, positionY } = req.body;
  newPage.book = id;   //le guardamos el id del book al que pertenece
})

router.post('/addText/:id')


module.exports = router;