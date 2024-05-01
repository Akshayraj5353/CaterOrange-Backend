// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// // Create a User model
// const User = mongoose.model('login', userSchema);

// module.exports = User;




const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  signupTime: { type: Number, default: Date.now },
  lastLogin: { type: Number,  default: null }
});

// Create a User model
const User = mongoose.model('User', userSchema);

module.exports = User;