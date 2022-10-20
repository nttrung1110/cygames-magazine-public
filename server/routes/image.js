const router = require("express").Router();

const auth = require("../middlewares/auth");

const { uploadImage } = require("../controllers/image");

const multer = require("../middlewares/multer");
const { imageValidator, validate } = require("../middlewares/validator");

router.post(
  "/upload",
  auth,
  multer.single("image"),
  imageValidator,
  validate,
  uploadImage
);

module.exports = router;
