const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET; 



// Google auth route
router.post("/google", async (req, res) => {
  try {
    const { email, name, photo, googleId } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        googleId, 
        photo,
        provider: "google",
      });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Google login failed", error: err.message });
  }
});

module.exports = router;
