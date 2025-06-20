const mongoose = requrie('mongoose');

const passwordSchema = mongoose.Schema({
  password: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }
})

module.exports = mongoose.model('password', passwordSchema);
