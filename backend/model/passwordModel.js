const mongoose = require('mongoose');

const passwordSchema = mongoose.Schema({
  username: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  website: String,
})

module.exports = mongoose.model('password', passwordSchema);
