const Manager = require("../models/manager.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.loginManager = async (req, res) => {
     try {
    const { email, password } = req.body;
    let manager = await Manager.findOne({ email: email, isDelete: false });
    if (!manager) {
      return res.status(404).json({ message: "Manager not found." });
    }

    let matchPass = await bcrypt.compare(password, manager.password);
    if (!matchPass) {
      return res.status(400).json({ message: "Password is not matched" });
    }
    let payload = {
      managerId: manager._id,
    };
    let token = await jwt.sign(payload, "manager");
    return res
      .status(200)
      .json({ message: "Manager Login Success", adminToken: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Admin Profile
exports.myProfile = async (req, res) => {
  try {
    let manager = req.user;
    return res.status(200).json({ message: "Profile Success", data: manager });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};