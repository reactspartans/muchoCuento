const express = require('express');
const router = express.Router();
const User = require ('../models/User')
const uploader = require('../configs/cloudinaryUser.config');



router.post('/private/profile/:_id', uploader.single("imageUrl"), (req, res, next) => {

  console.log(req.file, 'soy req.file')

  if (!req.file) {
    res.status(500).json({ msg: 'No file uploaded!' })
    return;
  }

  const {_id} = req.params

  console.log(req.params._id)
  console.log(_id)

  const { secure_url } = req.file 

  User.findByIdAndUpdate(_id ,{ $set: {profilePhoto: secure_url} }, {new:true})
    .then(userUpdated=> res.json(userUpdated))
    .catch(err=>console.log(err))
  
}),



router.post('/updateuser/:_id', (req, res, next)=>{

  const {_id} = req.params
  console.log(req.params._id)
  console.log(_id)

  const {username, email} = req.body

  User.findByIdAndUpdate(_id, {$set: {username, email }})
    .then(userUpdated=> res.json(userUpdated))
    .catch(err=>console.log(err))
})

module.exports = router