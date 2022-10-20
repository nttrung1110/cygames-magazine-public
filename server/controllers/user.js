const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findByCredentials(username, password);

  if (!user) {
    return res.status(401).json({
      error: [{ msg: "Login failed! Check authentication credentials" }],
    });
  }

  const access_token = await user.createAccessToken({ id: user._id });

  res.json({ access_token });
};

exports.verifyToken = async (req, res) => {
  const access_token = req.header("Authorization")?.replace("Bearer ", "");
  if (!access_token)
    return res.status(400).json({ err: "Invalid Authentication." });

  const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET);
  if (!decoded) return res.status(400).json({ err: "Invalid Authentication." });

  const user = await User.findOne({ _id: decoded._id, isAdmin: true });

  if (!user) {
    throw new Error();
  }

  res.json({ success: true });
};
