const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes.js');
const connectDB = require('./config/connectDB.js')
const passwordRoutes = require('./routes/passwordRoutes.js');


dotenv.config();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
connectDB();

console.log('cors applied');

app.use('/api/auth', authRoutes);

app.use('/api/password', passwordRoutes);


app.listen(process.env.PORT, () => {
  console.log('Server connected to Port: ', process.env.PORT);
})
