const express = require("express");
const router = express.Router();

const Article = require("../models/article");

const verifyToken = require("../middleware/auth");

// @route GET api/articles
// @desc Get articles
// @acccess public

router.get("/", async (req, res) => {
  try {
    const articles = await Article.find({})
      .sort({ createdAt: -1 })
      .populate("tags");
    res.json({
      success: true,
      articles,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server eror",
    });
  }
});

// @route GET api/articles/rank
// @desc Get articles rank
// @acccess public

router.get("/rank", async (req, res) => {
  try {
    const articles = await Article.find({})
      .sort({ views: -1, createdAt: -1 })
      .limit(5);
    res.json({
      success: true,
      articles,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server eror",
    });
  }
});

// @route GET api/page/:page/limit/:limit
// @desc Get all article with page
// @acccess public

router.get("/page/:page/limit/:limit", async (req, res, next) => {
  try {
    let perPage = req.params.limit;
    let page = req.params.page || 1;

    await Article.find({})
      .sort({ createdAt: -1 })
      .populate("tags")
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec((err, articles) => {
        Article.countDocuments({}, (err, count) => {
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

// @route GET api/articles/:id
// @desc Get articles by id
// @acccess public

router.get("/:id", async (req, res, next) => {
  try {
    let id = req.params.id;

    const rawArticle = await Article.findOne({ url_name: id });

    const article = await Article.findOneAndUpdate(
      { url_name: id },
      { $inc: { views: 1 } }
    ).populate("tags");

    const prevArticle = await Article.findOne({ _id: { $gt: article._id } })
      .sort({ _id: 1 })
      .limit(1);
    const nextArticle = await Article.findOne({ _id: { $lt: article._id } })
      .sort({ _id: -1 })
      .limit(1);

    const relateArticle = await Article.aggregate([
      {
        $match: {
          title: { $nin: [rawArticle.title] },
          tags: { $in: rawArticle.tags },
        },
      },
      {
        $lookup: {
          from: "tags",
          localField: "tags",
          foreignField: "_id",
          as: "tags",
        },
      },
      { $sample: { size: 3 } },
    ]);

    res.json({
      success: true,
      article,
      prevArticle,
      nextArticle,
      relateArticle,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server eror",
    });
  }
});

// @route POST api/articles/:id
// @desc Post articles/:id
// @acccess private

router.post("/", verifyToken, async (req, res) => {
  const {
    url_name,
    image_name,
    title,
    category,
    tags,
    content,
    meta_title,
    meta_description,
    meta_image,
  } = req.body;

  // Simple validation
  if (
    !url_name ||
    !image_name ||
    !title ||
    !category ||
    !content ||
    !meta_title ||
    !meta_description ||
    !meta_image
  ) {
    return res.status(400).json({
      success: false,
      message: "Missing field",
    });
  }

  // All good
  try {
    const newArticle = new Article({
      url_name,
      image_name,
      title,
      category,
      tags,
      content,
      meta_title,
      meta_description,
      meta_image,
    });
    await newArticle.save();

    res.json({
      success: true,
      message: "Add article success!",
      article: newArticle,
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
