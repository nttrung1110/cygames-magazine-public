const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TagSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    url_name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("tags", TagSchema);
