const express = require("express");
const router = express.Router();

const Tag = require("../models/tag");
const Article = require("../models/article");

// @route Tag api/tag
// @desc Get tag
// @acccess Public

router.get("/", async (req, res) => {
  try {
    const tags = await Tag.find({}).sort({ createdAt: -1 });

    res.json({
      success: true,
      tags,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server eror",
    });
  }
});

// @route GET api/tag/:tag_name/page/:page
// @desc Get article with tag and page
// @acccess public

router.get("/:tag_name/page/:page/limit/:limit", async (req, res, next) => {
  try {
    let perPage = req.params.limit;
    let page = req.params.page || 1;
    let tag_name = req.params.tag_name;
    let tag = await Tag.findOne({ url_name: tag_name });

    await Article.find({ tags: { $in: [tag._id] } })
      .sort({ createdAt: -1 })
      .populate("tags")
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec((err, articles) => {
        Article.countDocuments({ tags: { $in: [tag._id] } }, (err, count) => {
          if (err) return next(err);
          res.json({
            success: true,
            articles,
            totalPage: Math.ceil(count / perPage),
          });
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server eror",
    });
  }
});

// @route Tag api/tag
// @desc Create tag
// @acccess Private

router.post("/", async (req, res) => {
  const { title, url_name } = req.body;

  // Simple validation
  if (!title || !url_name) {
    return res.status(400).json({
      success: false,
      message: "Missing field",
    });
  }

  // All good
  try {
    const newTag = new Tag({
      title,
      url_name,
    });

    await newTag.save();

    res.json({
      success: true,
      message: "Add tag success!",
      tag: newTag,
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
