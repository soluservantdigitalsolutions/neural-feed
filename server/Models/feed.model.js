const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const feedSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: [true, "Caption is required"],
    },
    video: {
      type: String,
      required: [true, "Video is required"],
    },
    comprehensions: {
      type: Number,
      default: 0,
    },
    hats: {
      type: Number,
      default: 0,
    },
    attendances: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
    test: {
      type: String,
      required: [true, "Test Question is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("feed", feedSchema);
