const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TagSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.tag || mongoose.model("tags", TagSchema);
