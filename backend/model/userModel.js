const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  passwords: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'password',
  }]
})

module.exports = mongoose.model('user', userSchema);