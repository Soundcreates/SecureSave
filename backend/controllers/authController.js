const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../model/userModel');


module.exports.registerController = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists, please login!" })
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    })
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_KEY, { expiresIn: '1d' });


    return res.status(200).json({
      message: 'User registered Successfully', token, user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      }
    });


  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error , please try again later!" });
  }



}

module.exports.loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) return res.status(400).json({ message: 'User not found, please register!' });

    const isValidPassword = await bcrypt.compare(password, existingUser.password);
    if (!isValidPassword) return res.status(401).json({ message: "Invalid credentials, please try again later" });
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_KEY, { expiresIn: '1d' });

    return res.status(200).json({
      message: "User logged in successfully", token, user: {
        id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
      }
    })
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error, please try again later" });
  }

}

module.exports.getMe = async (req, res) => {
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return res.status(400).json({ message: "No token provided!" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = decoded.id;

    const currentUser = await userModel.findById(user).select('-password');
    if (!currentUser) return res.status(404).json({ message: "User not found!" });
    return res.status(200).json({ currentUser });
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({ message: "Invalid or expired token" });

  }



}

