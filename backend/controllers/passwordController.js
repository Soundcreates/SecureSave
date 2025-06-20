const crypto = require('crypto-js');
const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');
const passwordModel = require('../model/passwordModel');


const aes = process.env.AES_KEY;

module.exports.addPassword = async (req, res) => {
  const { password, website } = req.body;

  const hashedPassword = crypto.AES.encrypt(password, aes);
  const encryptedWeb = crypto.AES.encrypt(website)

  const authHeader = req.headers.authorization;
  const token = authHeader.slice(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  const userId = decoded.id;

  const user = await userModel.findById(userId).populate('passwords');
  user.passwords.push({ password: hashedPassword, website: encryptedWeb });
  await user.passwords.save();

}

module.exports.fetchPasswords = async (req, res) => {
  const authHeader = req.header.authorization;
  try {

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const userId = decoded.id;

    const passwords = passwordModel.find({ author: userId });

    res.status(200).json(passwords);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Internal server error , please try again later" });

  }



}