// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const Image = require("../models/image.models");
require("dotenv").config()



mongoose
  .connect(`mongodb://localhost/${process.env.DB}`, { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    // Image.collection.drop()
    //   .then(() => {
    //     return 
      Image.create(images)
      // })
      .then(usersCreated => {
        console.log(`${usersCreated.length} users created with the following id:`);
        console.log(usersCreated.map(u => u._id));
      })
      .then(() => {
        // Close properly the connection to Mongoose
        mongoose.disconnect()
      })
      .catch(err => {
        mongoose.disconnect()
        throw err
      })
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let images = [
  {
    name: "bosque atardecer",
    tags: ["bosque", "atardecer", "arboles", "flores"],
    status: "background",
    imageURL: "https://res.cloudinary.com/lulas/image/upload/v1560246747/ilustraciones/fondos%20paisajes/bosque-tonos-rojizos_mw6idh.png"
  },
  {
    name: "paisaje montañas atardecer",
    tags: ["montañas", "atardecer", "paisaje", "arboles"],
    status: "background",
    imageURL: "https://res.cloudinary.com/lulas/image/upload/v1560246748/ilustraciones/fondos%20paisajes/montan%CC%83as-tonos-naranja_labxqa.jpg"
  },
  {
    name: "bosque",
    tags: ["bosque", "setas", "arboles"],
    status: "background",
    imageURL: "https://res.cloudinary.com/lulas/image/upload/v1560246747/ilustraciones/fondos%20paisajes/paisaje-bosque-setas_iio2t4.jpg"
  },
  {
    name: "paisaje montañas azules",
    tags: ["montañas", "sol", "arboles", "atardecer"],
    status: "background",
    imageURL: "https://res.cloudinary.com/lulas/image/upload/v1560246748/ilustraciones/fondos%20paisajes/landscape-bosque-luna-roja_uowgmy.png"
  },
  {
    name: "elefante gris flores",
    tags: ["elefante", "gris", "flores", "sentado"],
    status: "character",
    imageURL: "https://res.cloudinary.com/lulas/image/upload/v1560246746/ilustraciones/personajes%20limpios/elefante-flor_dsuef1.png"
  },
  {
    name: "cabra con mariposa",
    tags: ["cabra", "marron", "mariposa"],
    status: "character",
    imageURL: "https://res.cloudinary.com/lulas/image/upload/v1560246746/ilustraciones/personajes%20limpios/cabras_sag2xu.psd"
  },
  {
    name: "oso corazon",
    tags: ["oso", "marron", "corazon"],
    status: "character",
    imageURL: "https://res.cloudinary.com/lulas/image/upload/v1560246745/ilustraciones/personajes%20limpios/oso-corazon_pjmbhl.png"
  },
  {
    name: "pajarito amarillo",
    tags: ["pajaro", "pajarito", "amarillo"],
    status: "character",
    imageURL: "https://res.cloudinary.com/lulas/image/upload/v1560246744/ilustraciones/personajes%20limpios/pajarito-amarillo-perfil-_zwqfdw.png"
  },
  {
    name: "hipopotama bailarina acuarela",
    tags: ["hipo", "hipopotama", "hipopotamo", "bailarina", "tutu", "acuarela"],
    status: "character",
    imageURL: "https://res.cloudinary.com/lulas/image/upload/v1560246742/ilustraciones/personajes%20limpios/hipopotama-bailarina-acuarela_itj6ct.png"
  },
]


