const crypto = require('crypto-js');
const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');
const passwordModel = require('../model/passwordModel');


const aes = process.env.AES_KEY;

module.exports.addPassword = async (req, res) => {
  const { password, website, username } = req.body;

  try {
    const hashedPassword = crypto.AES.encrypt(password, aes);
    const encryptedWeb = crypto.AES.encrypt(website)

    const userId = req.user.id;

    const user = await userModel.findById(userId).populate('passwords');
    user.passwords.push({ password: hashedPassword, website: encryptedWeb, username });
    await user.passwords.save();
    return res.status(200).json({ message: "Password added successfully" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error, please try again later" })
  }




}

module.exports.fetchPasswords = async (req, res) => {
  try {
    const userId = req.user.id;

    const passwords = passwordModel.find({ author: userId });

    res.status(200).json(passwords);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Internal server error , please try again later" });

  }

}

module.exports.deletePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const passwordId = req.params.passwordId;

    const foundPassword = await passwordModel.deleteOne({ _id: passwordId });
    const user = await userModel.findById(userId).populate('passwords');
    user.passwords = user.passwords.filter(password => password._id !== passwordId);
    await user.save();


  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error, please try again later" });
  }

}