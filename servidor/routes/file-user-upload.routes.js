const express = require('express');
const router = express.Router();
const GalleryImage = require('../models/Book/GalleryImage.models')
const User = require ('../models/User')
const uploader = require('../configs/cloudinaryUser.config');



router.post('/uploadprofile', uploader.single("imageUrl"), (req, res, next) => {

    console.log(req.file, 'soy req.file')
  
    if (!req.file) {
      res.status(500).json({ msg: 'No file uploaded!' })
      return;
    }
  
    const { originalname, secure_url } = {...req.file}
    
  
      
    GalleryImage.findOne({name: originalname})
    .then(image => {
      if(image){
        res.json({ imageURL:image.imageURL, name:image.name, id: image._id })
      } else {
        GalleryImage.create([{ name: originalname, imageURL: secure_url }])
        .then(data => {
          console.log(data)
          res.json({ imageURL:data[0].imageURL, name:data[0].name, id: data[0]._id });
        })
        .catch(err => console.log('Error:', err))
      }
    })    
  })


  router.post('/private/profile/:_id'), (req, res, next)=>{
    console.log('actualizar foto perfil')
    const _id = req.params._id
    User.findByIdAndUpdate(_id ,{ $set: {profilePhoto: secure_url} })
      .then(res=>console.log(res))
      .catch(err=>console.log(err))
  }





  module.exports = router;