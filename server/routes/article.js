const router = require("express").Router();

const auth = require("../middlewares/auth");

const {
  getArticles,
  createArticle,
  getArticle,
  updateArticle,
  deleteArticle,
  searchArticle,
  getRankArticles,
} = require("../controllers/article");

const multer = require("../middlewares/multer");
const {
  articleValidator_Create,
  articleValidator_Update,
  articleValidator_IsValidObjectId,
  validate,
} = require("../middlewares/validator");

router.post(
  "/create",
  auth,
  multer.single("thumbnail"),
  (req, res, next) => {
    const { tags, meta } = req.body;

    if (tags) req.body.tags = JSON.parse(tags);

    req.body.meta = JSON.parse(meta);

    next();
  },
  articleValidator_Create,
  validate,
  createArticle
);

router.put(
  "/update/:articleId",
  auth,
  multer.single("thumbnail"),
  (req, res, next) => {
    const { tags, meta } = req.body;

    if (tags) req.body.tags = JSON.parse(tags);

    req.body.meta = JSON.parse(meta);

    next();
  },
  articleValidator_Update,
  validate,
  updateArticle
);

router.delete(
  "/delete/:articleId",
  auth,
  articleValidator_IsValidObjectId,
  validate,
  deleteArticle
);

router.get("/getArticles", getArticles);

router.get("/getArticle/:slug", getArticle);

router.get("/search", searchArticle);

router.get("/rank", getRankArticles);

module.exports = router;
