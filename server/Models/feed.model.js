/* eslint-disable no-undef */
const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const feedSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    enrollments: {
      type: [String],
      default: [],
    },
    admissions: {
      type: [String],
      default: [],
    },
    username: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: [true, "Caption is required"],
    },
    description: {
      type: String,
    },
    video: {
      type: String,
      required: [true, "Video is required"],
    },
    comprehensions: {
      type: Array,
      default: [],
    },
    confusions: {
      type: Array,
      default: [],
    },
    hats: {
      type: Array,
      default: [],
    },
    attendances: {
      type: Array,
      default: [],
    },
    tags: {
      type: Array,
      default: [],
    },
    comments: {
      type: Array,
      default: [],
    },
    tests: [
      {
        question: {
          type: String,
          required: true,
        },
        options: {
          A: { type: String, required: true },
          B: { type: String, required: true },
          C: { type: String, required: true },
          D: { type: String, required: true },
        },
        answer: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("feed", feedSchema);
