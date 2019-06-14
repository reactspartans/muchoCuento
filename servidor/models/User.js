const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  profilePhoto: {type : String, default: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/eb4e52bd-fc99-4db9-8d65-eadf01fdabbf/d38o83n-fe2ac891-3022-40d9-88fd-338c3e13d3fc.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2ViNGU1MmJkLWZjOTktNGRiOS04ZDY1LWVhZGYwMWZkYWJiZlwvZDM4bzgzbi1mZTJhYzg5MS0zMDIyLTQwZDktODhmZC0zMzhjM2UxM2QzZmMuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.FwzSQx6QReO5lD2K5Ec8AHS6VKr0zOyabBvMUc_6czM'}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
