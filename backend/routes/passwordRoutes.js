const express = require('express');
const passwordRoutes = express.Router();
const { addPassword, fetchPasswords } = require('../controllers/passwordController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

passwordRoutes.post('/addPassword', authMiddleware, addPassword);

passwordRoutes.get('/fetchPasswords', authMiddleware, fetchPasswords);