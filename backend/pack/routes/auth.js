const express = require("express");
const User = require("../models/User");

const router = express.Router();

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

    res.json({ msg: "Login successful", user });
  } catch (err) {
    res.status(500).json({ msg: "Google login failed", error: err.message });
  }
});

module.exports = router;
