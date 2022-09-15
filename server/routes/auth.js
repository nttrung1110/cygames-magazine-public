require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const verifyToken = require("../middleware/auth");

// @route GET api/auth
// @desc Check if user is logged in
// @access Public
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = req.user;

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/auth/login
// @desc Login user
// @access Public

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Simple validation
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing username and/or password" });
  }

  try {
    if (
      username !== `${process.env.ADMIN_USERNAME}` ||
      password !== `${process.env.ADMIN_PASSWORD}`
    ) {
      return res
        .status(400)
        .json({ susscess: false, message: "Incorrect username or password" });
    }

    // All good
    // Return token
    const accessToken = jwt.sign(
      { user: "Admin" },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      success: true,
      message: "Login successfully!",
      accessToken,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server eror",
    });
  }
});
module.exports = router;
