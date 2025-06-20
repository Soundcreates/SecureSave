const mongoose = require('mongoose');

const connectDB = async () => {
  const connect = await mongoose.connect(process.env.MONGO_URI);
  if (connect) {
    console.log('Db connected');
  } else {
    throw Error('db cant connect :(');
  }
};

module.exports = connectDB;