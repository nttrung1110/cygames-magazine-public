const multer = require("multer");

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  // check if file is image or not
  if (!file.mimetype.includes("image")) {
    return cb(new Error("Invalid image format!"));
  }

  // if ok then next();
  cb(null, true);
};

module.exports = multer({ storage, fileFilter });
