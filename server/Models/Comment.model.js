const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const CommentModel = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    feedId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("comments", CommentModel);
