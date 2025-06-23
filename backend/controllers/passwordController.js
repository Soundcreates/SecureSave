const crypto = require('crypto-js');
const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');
const passwordModel = require('../model/passwordModel');




module.exports.addPassword = async (req, res) => {
  const { password, website, username } = req.body;

  try {
    const hashedPassword = crypto.AES.encrypt(password, process.env.AES_KEY).toString();
    const encryptedWeb = crypto.AES.encrypt(website, process.env.AES_KEY).toString();

    const userId = req.user.id;

    const newPassword = await passwordModel.create({
      password: hashedPassword,
      website: encryptedWeb,
      username,
      author: userId,
    });

    const user = await userModel.findById(userId);
    user.passwords.push(newPassword._id);
    await user.save();

    return res.status(200).json({ message: "Password added successfully", password: newPassword });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error, please try again later" });
  }
};


module.exports.fetchPasswords = async (req, res) => {
  try {
    const userId = req.user.id;

    const passwords = await passwordModel.find({ author: userId });

    const decryptedPasswords = passwords.map(pwd => {
      const decryptedPassword = crypto.AES.decrypt(pwd.password, process.env.AES_KEY).toString(crypto.enc.Utf8);
      const decryptedWebsite = crypto.AES.decrypt(pwd.website, process.env.AES_KEY).toString(crypto.enc.Utf8);

      return {
        _id: pwd._id,
        website: decryptedWebsite,
        password: decryptedPassword,
        username: pwd.username,
        author: pwd.author,
      };
    });

    res.status(200).json({ passwords: decryptedPasswords });
  } catch (err) {
    console.error("Decryption Error:", err.message);
    res.status(500).json({ message: "Internal server error, please try again later" });
  }
};


module.exports.deletePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const passwordId = req.params.passwordId;

    // First delete the password from the password collection
    const deletedPassword = await passwordModel.findByIdAndDelete(passwordId);
    if (!deletedPassword) {
      return res.status(404).json({ message: "Password not found" });
    }

    // Then update the user's passwords array
    const user = await userModel.findById(userId).populate("passwords");
    if (user && user.passwords && Array.isArray(user.passwords)) {
      user.passwords = user.passwords.filter(
        (password) => password._id.toString() !== passwordId
      );
      await user.save();
    }

    return res.status(200).json({ message: "Password deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
