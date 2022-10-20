const Tag = require("../models/tag");
const Article = require("../models/article");

exports.createTag = async (req, res) => {
  const { slug, title } = req.body;

  const tag = new Tag({
    slug,
    title,
  });

  await tag.save();

  res.json({
    tag,
  });
};

exports.getTags = async (req, res) => {
  const tags = await Tag.find({}).sort({ createdAt: -1 }).select("slug title");

  res.json({
    tags,
  });
};

exports.updateTag = async (req, res) => {
  const { tagId } = req.params;

  const { slug, title } = req.body;

  const tag = await Tag.findById(tagId);

  // check if this new slug is belong to this tag
  const isValidSlug = await Tag.findOne({
    _id: { $nin: [tag._id] },
    slug,
  });

  // if it not then return, because it'll cause duplicate slug
  if (isValidSlug) {
    return res
      .status(401)
      .json({ error: [{ msg: "This slug belong to another tag." }] });
  }

  // else update tag
  tag.slug = slug;
  tag.title = title;

  await tag.save();

  res.json({ tag });
};

exports.deleteTag = async (req, res) => {
  const { tagId } = req.params;

  await Tag.findByIdAndDelete(tagId);

  // after delete tag, remove it from all articles have this tag
  await Article.updateMany({ tags: tagId }, { $pull: { tags: tagId } });

  res.json({ msg: "Tag is removed successfully!" });
};
