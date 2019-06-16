const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  profilePhoto: {type : String, default: 'https://res.cloudinary.com/lulas/image/upload/v1560520974/ilustraciones/d38o83n-fe2ac891-3022-40d9-88fd-338c3e13d3fc.jpg_uhmw33.jpg'}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
