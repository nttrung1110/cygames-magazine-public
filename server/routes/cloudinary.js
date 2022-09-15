const express = require("express");
const router = express.Router();

const { cloudinary } = require("../utils/cloudinary");

router.get("/images", async (req, res) => {
  try {
    const { resources } = await cloudinary.search
      .expression("folder:uploads")
      .sort_by("public_id", "asc")
      .execute();

    const images = resources.map((file) => file.filename);

    res.json({ success: true, images });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

router.get("/images/:article", async (req, res) => {
  try {
    let article = req.params.article.split("_");

    const { resources } = await cloudinary.search
      .expression(`folder:uploads/${article[0]}`)
      .sort_by("public_id", "asc")
      .execute();

    const images = resources.map((file) => file.filename);

    res.json({ success: true, images });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

router.post("/upload", async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "uploads",
    });

    res.json({ message: "uploads" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

module.exports = router;
