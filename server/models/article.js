const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: Object,
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["PEOPLE", "COMPANY", "EVENT", "STAFF VOICE", "MOVIE"],
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "tags",
      },
    ],
    meta: {
      type: Object,
      title: {
        type: String,
        required: true,
      },
      desctiption: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      required: true,
    },
    isNewArticle: {
      type: Boolean,
      default: true,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.article || mongoose.model("articles", ArticleSchema);
