const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
  {
    url_name: {
      type: String,
      required: true,
    },
    image_name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
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
    content: {
      type: String,
      required: true,
    },
    meta_title: {
      type: String,
      required: true,
    },
    meta_description: {
      type: String,
      required: true,
    },
    meta_image: {
      type: String,
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

module.exports = mongoose.model("articles", ArticleSchema);
