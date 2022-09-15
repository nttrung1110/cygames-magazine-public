const express = require("express");
const router = express.Router();

const Article = require("../models/article");

// @route Tag api/search?s=search_param
// @desc Get articles with search_param
// @acccess Public

router.get("/page/:page/limit/:limit", async (req, res, next) => {
  try {
    let perPage = Number(req.params.limit);
    let page = Number(req.params.page);
    let search_query = {
      $search: {
        index: "default",
        compound: {
          should: [
            {
              autocomplete: {
                query: req.query.s ? req.query.s : " ",
                path: "title",
              },
            },
            {
              autocomplete: {
                query: req.query.s ? req.query.s : " ",
                path: "content",
              },
            },
          ],
        },
      },
    };

    await Article.aggregate([
      search_query,
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: "tags",
          localField: "tags",
          foreignField: "_id",
          as: "tags",
        },
      },
      { $skip: perPage * page - perPage },
      { $limit: perPage },
    ]).exec((err, articles) => {
      Article.aggregate([search_query, { $count: "count" }], (err, count) => {
        if (err) return next(err);
        res.json({
          success: true,
          articles,
          count: count[0] ? count[0].count : 0,
          totalPage: Math.ceil((count[0] ? count[0].count : 0) / perPage),
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

module.exports = router;
