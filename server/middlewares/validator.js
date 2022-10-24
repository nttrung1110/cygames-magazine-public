const { check, validationResult } = require("express-validator");
const { isValidObjectId } = require("mongoose");

const Tag = require("../models/tag");
const Article = require("../models/article");

// <-------------------------------- ARTICLE ROUTE --------------------------------> //
exports.articleValidator_Create = [
  check("slug")
    .not()
    .isEmpty()
    .withMessage("Article slug is missing!")
    .custom(async (slug) => {
      const isExists = await Article.findOne({ slug });

      if (isExists) {
        throw Error("This slug already exists!");
      }

      return true;
    }),
  check("title").not().isEmpty().withMessage("Article title is missing!"),
  check("content").not().isEmpty().withMessage("Article content is missing!"),
  check("thumbnail").custom((_, { req }) => {
    const { file } = req;

    if (!file) {
      throw Error("Article thumbnail is missing!");
    }

    return true;
  }),
  check("category").not().isEmpty().withMessage("Article category is missing!"),
  check("tags").custom(async (tags) => {
    if (tags) {
      for (let tag of tags) {
        if (!isValidObjectId(tag)) {
          throw Error("Invalid mongodb object ID");
        }

        const isExists = await Tag.findById(tag);
        if (!isExists) {
          throw Error("This tag is not exists!");
        }
      }
    }

    return true;
  }),
  check("meta.title")
    .not()
    .isEmpty()
    .withMessage("Article meta title is missing!"),
  check("meta.description")
    .not()
    .isEmpty()
    .withMessage("Article meta description is missing!"),
  check("meta.image")
    .not()
    .isEmpty()
    .withMessage("Article meta image is missing!"),
];

exports.articleValidator_Update = [
  check("slug").not().isEmpty().withMessage("Article slug is missing!"),
  check("title").not().isEmpty().withMessage("Article title is missing!"),
  check("content").not().isEmpty().withMessage("Article content is missing!"),
  check("category").not().isEmpty().withMessage("Article category is missing!"),
  check("tags").custom(async (tags) => {
    if (tags) {
      for (let tag of tags) {
        if (!isValidObjectId(tag)) {
          throw Error("Invalid mongodb object ID");
        }

        const isExists = await Tag.findById(tag);
        if (!isExists) {
          throw Error("This tag is not exists!");
        }
      }
    }

    return true;
  }),
  check("meta.title")
    .not()
    .isEmpty()
    .withMessage("Article meta title is missing!"),
  check("meta.description")
    .not()
    .isEmpty()
    .withMessage("Article meta description is missing!"),
  check("meta.image")
    .not()
    .isEmpty()
    .withMessage("Article meta image is missing!"),
];

exports.articleValidator_IsValidObjectId = [
  check("articleId").custom(async (articleId) => {
    if (!isValidObjectId(articleId)) {
      throw Error("Invalid mongodb object ID");
    }

    const isExists = await Article.findById(articleId);
    if (!isExists) {
      throw Error("This article is not exists!");
    }

    return true;
  }),
];

// <-------------------------------- TAG ROUTE --------------------------------> //
exports.tagValidator_POST = [
  check("slug")
    .not()
    .isEmpty()
    .withMessage("Tag slug is missing!")
    .custom(async (slug) => {
      const isExists = await Tag.findOne({ slug });

      if (isExists) {
        throw Error("This slug already exists!");
      }

      return true;
    }),
  check("title").not().isEmpty().withMessage("Tag title is missing!"),
];

exports.tagValidator_IsValidObjectId = [
  check("tagId").custom(async (tagId) => {
    if (!isValidObjectId(tagId)) {
      throw Error("Invalid mongodb object ID");
    }

    const isExists = await Tag.findById(tagId);
    if (!isExists) {
      throw Error("This tag is not exists!");
    }

    return true;
  }),
];

// <-------------------------------- IMAGE ROUTE --------------------------------> //
exports.imageValidator = [
  check("slug") // check article's slug to create folder by slug in cloudinary
    .not()
    .isEmpty()
    .withMessage("Article slug is missing!"),
  // .custom(async (slug) => {
  //   const isExists = await Article.findOne({ slug });

  //   if (!isExists) {
  //     throw Error("This article is not exists!");
  //   }

  //   return true;
  // }),
  check("image").custom((_, { req }) => {
    const { file } = req;

    if (!file) {
      throw Error("Please select an image to upload!");
    }

    return true;
  }),
];

// VALIDATE RESULTS
exports.validate = (req, res, next) => {
  const error = validationResult(req).array();

  if (error.length) {
    return res.status(401).json({ error });
  }

  next();
};
