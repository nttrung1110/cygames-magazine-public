const router = require("express").Router();

const { login, verifyToken } = require("../controllers/user");

// router.post("/", async (req, res) => {
//   try {
//     const user = new User(req.body);

//     await user.save();

//     res.status(201).send({ user });
//   } catch (error) {
//     console.log(error);
//     res.status(400).send(error);
//   }
// });

router.post("/login", login);
router.post("/verifyToken", verifyToken);

module.exports = router;
