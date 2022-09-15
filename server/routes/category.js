const express = require("express");
const router = express.Router();

const Article = require("../models/article");

// @route GET api/category/:category_name/page/:page
// @desc Get article with category and page
// @acccess public

router.get(
  "/:category_name/page/:page/limit/:limit",
  async (req, res, next) => {
    try {
      let perPage = req.params.limit;
      let page = req.params.page;
      let category_name = req.params.category_name.toUpperCase();

      await Article.find({ category: category_name })
        .sort({ createdAt: -1 })
        .populate("tags")
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec((err, articles) => {
          Article.countDocuments({ category: category_name }, (err, count) => {
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
  }
);

module.exports = router;
