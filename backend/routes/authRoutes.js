const express = require('express');
const authRoutes = express.Router();
const { loginController, registerController } = require('../controllers/authController.js');

authRoutes.post('/login', loginController);

authRoutes.post('/register', registerController);


module.exports = authRoutes;

