const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteSchema = new Schema(
  {
    authorId: {
      type: String,
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: null,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    comprehensions: {
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
    comments: [
      {
        userId: { type: String, required: true },
        comment: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", noteSchema);
