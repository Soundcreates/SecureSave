const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;

    next();
  } catch (err) {
    console.log("JWT error: ", err.message);
    return res.status(401).json({ message: "Unauthorized or invalid token!" });

  }

}

module.exports = authMiddleware;