const Article = require("../models/article");
const Tag = require("../models/tag");

const cloudinary = require("../cloudinary");

const LIMIT = 10;

exports.createArticle = async (req, res) => {
  const { slug, title, content, category, tags, meta } = req.body;
  const { file } = req;

  // upload image to cloudinary, then return image url and public_id(for delete image)
  const { secure_url: url, public_id } = await cloudinary.uploader.upload(
    file.path,
    {
      folder: `cygames-magazine/${slug}`, // create folder by article's slug in cloudinary
    }
  );

  const article = new Article({
    slug,
    title,
    content,
    thumbnail: {
      url,
      public_id,
    },
    category,
    tags,
    meta,
  });

  await article.save();

  res.json({
    article,
  });
};

exports.getArticle = async (req, res) => {
  const { slug } = req.params;

  const article = await Article.findOneAndUpdate(
    { slug },
    { $inc: { views: 1 } }
  )
    .populate("tags", "slug title")
    .select("-__v -updatedAt");

  const tagsRelatedId = article.tags.map((tag) => tag._id);

  // find all related articles that
  const relatedArticles = await Article.aggregate([
    {
      $match: {
        _id: { $ne: article._id }, // ignore current article to prevent duplicate
        tags: { $in: [...tagsRelatedId] }, // related based on current article's tags
      },
    },
    {
      $lookup: {
        from: "tags",
        localField: "tags",
        foreignField: "_id",
        as: "tags",
      }, // populate tags
    },
    { $sample: { size: 3 } }, // get randomly 3 article
    {
      $project: {
        slug: 1,
        thumbnail: 1,
        title: 1,
        category: 1,
        tags: { _id: 1, slug: 1, title: 1 },
        createdAt: 1,
      },
    },
  ]);

  const prevArticle = await Article.findOne({ _id: { $gt: article._id } })
    .sort({ _id: 1 })
    .limit(1)
    .select("slug title");

  const nextArticle = await Article.findOne({ _id: { $lt: article._id } })
    .sort({ _id: -1 })
    .limit(1)
    .select("slug title");

  res.json({
    article,
    relatedArticles,
    prevArticle,
    nextArticle,
  });
};

exports.updateArticle = async (req, res) => {
  const { articleId } = req.params;

  const { slug, title, content, category, tags } = req.body;
  const { file } = req;

  const article = await Article.findById(articleId);

  // check if this new slug is belong to this article
  const isValidSlug = await Article.findOne({
    _id: { $nin: [article._id] },
    slug,
  });

  // if it not then return, because it'll cause duplicate slug
  if (isValidSlug) {
    return res
      .status(401)
      .json({ error: [{ msg: "This slug belong to another article." }] });
  }

  // if modify article's image
  // remove old image
  // upload new image to cloudinary
  if (file) {
    const { public_id: old_public_id } = article.thumbnail;
    // remove old image in cloudinary by public_id
    const { error } = await cloudinary.uploader.destroy(old_public_id);

    if (error) {
      return res.status(401).json({ error });
    }

    // upload new image to cloudinary, then return image url and public_id(for delete image)
    const { secure_url: url, public_id } = await cloudinary.uploader.upload(
      file.path,
      {
        folder: `cygames-magazine/${slug}`, // create folder by article's slug in cloudinary
      }
    );

    // modify old article thumbnail
    article.thumbnail = {
      url,
      public_id,
    };
  }

  // modify the rest
  article.slug = slug;
  article.title = title;
  article.content = content;
  article.category = category;
  article.tags = tags;

  await article.save();

  res.json({ article });
};

exports.deleteArticle = async (req, res) => {
  const { articleId } = req.params;

  const article = await Article.findById(articleId);

  // get article's slug because folder based on it
  const { slug } = article;

  // first, delete all images in folder
  const { error: errorDeletedAllImage } =
    await cloudinary.api.delete_resources_by_prefix(`cygames-magazine/${slug}`);

  if (errorDeletedAllImage) {
    return res.status(401).json({ error: errorDeletedAllImage });
  }

  // secondly, delete empty folder
  const { error: errorDeletedEmptyFolder } = await cloudinary.api.delete_folder(
    `cygames-magazine/${slug}`
  );

  if (errorDeletedEmptyFolder) {
    return res.status(401).json({ error: errorDeletedEmptyFolder });
  }

  // finally, delete article
  await Article.findByIdAndDelete(articleId);

  const articleCount = await Article.countDocuments();

  res.json({
    msg: "Article is removed successfully!",
    totalPage: Math.ceil(articleCount / LIMIT),
  });
};

exports.getArticles = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // current page
  const category = req.query.category;
  const tagSlug = req.query.tag;

  let query = {};

  if (category && category !== "null") {
    query = { category };
  } else if (tagSlug && tagSlug !== "null") {
    const tag = await Tag.findOne({ slug: tagSlug }).select("_id");

    query = { tags: { $in: [tag._id] } };
  }

  const articles = await Article.find(query)
    .sort({ createdAt: -1 })
    .skip(page * LIMIT - LIMIT)
    .limit(LIMIT)
    .populate("tags", "title slug")
    .select("slug thumbnail title category tags createdAt");

  const articleCount = await Article.countDocuments(query);

  res.json({ articles, totalPage: Math.ceil(articleCount / LIMIT) });
};

exports.searchArticle = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // current page
  const searchKeyword = req.query.s;

  let search_query = [
    {
      $lookup: {
        from: "tags",
        localField: "tags",
        foreignField: "_id",
        pipeline: [{ $project: { title: 1, slug: 1 } }],
        as: "tags",
      },
    },
    { $sort: { createdAt: -1 } },
    { $skip: page * LIMIT - LIMIT },
    { $limit: LIMIT },
    {
      $project: {
        updatedAt: 0,
        __v: 0,
      },
    },
  ];

  let count_query = [{ $count: "count" }];

  // check if search keyword has value, then add search keyword to query
  if (searchKeyword && searchKeyword.trim().length !== 0) {
    const seach_index = {
      $match: {
        $or: [
          { title: new RegExp(searchKeyword, "i") },
          { content: new RegExp(searchKeyword, "i") },
        ],
      },
    };

    // const seach_index = {
    //   $search: {
    //     index: "search_article",
    //     text: {
    //       query: searchKeyword,
    //       path: {
    //         wildcard: "*",
    //       },
    //     },
    //   },
    // };

    search_query.unshift(seach_index); // add seach keyword to search query
    count_query.unshift(seach_index); // add seach keyword to count query
  }

  const articles = await Article.aggregate(search_query);
  const count = await Article.aggregate(count_query);

  res.json({
    articles,
    articlesCount: count[0] ? count[0].count : 0,
    totalPage: Math.ceil((count[0] ? count[0].count : 0) / LIMIT),
  });
};

exports.getRankArticles = async (req, res) => {
  const articles = await Article.find({})
    .sort({ views: -1, createdAt: -1 })
    .select("slug thumbnail title category createdAt")
    .limit(5);

  res.json({
    articles,
  });
};
