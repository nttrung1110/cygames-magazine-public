const jwt = require("jsonwebtoken");

const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const access_token = req.header("Authorization")?.replace("Bearer ", "");
    if (!access_token)
      return res.status(400).json({ err: "Invalid Authentication." });

    const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded)
      return res.status(400).json({ err: "Invalid Authentication." });

    const user = await User.findOne({ _id: decoded._id, isAdmin: true });

    if (!user) {
      throw new Error();
    }

    next();
  } catch (error) {
    res.status(401).send({ error: "Not authorized to access this resource" });
  }
};

module.exports = auth;
