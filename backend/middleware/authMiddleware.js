const express = require('express');
const app = express();

const authMiddleware = async (req, res, next) => {
  const autHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    res.status(401).json({ message: 'Unauthorized' });

  }

  next();
}

module.exports = authMiddleware;