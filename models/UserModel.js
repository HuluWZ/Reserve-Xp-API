const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true , unique :true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema,"User");

module.exports = User;



