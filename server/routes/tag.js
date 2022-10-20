const router = require("express").Router();

const auth = require("../middlewares/auth");

const {
  createTag,
  getTags,
  updateTag,
  deleteTag,
} = require("../controllers/tag");

const {
  tagValidator_POST,
  tagValidator_IsValidObjectId,
  validate,
} = require("../middlewares/validator");

router.post("/create", auth, tagValidator_POST, validate, createTag);

router.get("/getTags", getTags);

router.put(
  "/update/:tagId",
  auth,
  tagValidator_IsValidObjectId,
  validate,
  updateTag
);

router.delete(
  "/delete/:tagId",
  auth,
  tagValidator_IsValidObjectId,
  validate,
  deleteTag
);

module.exports = router;
