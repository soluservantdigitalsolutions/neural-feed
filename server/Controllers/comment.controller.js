/* eslint-disable no-undef */
const CommentModel = require("../Models/Comment.model");
const feedModel = require("../Models/feed.model");
const createError = require("../error");

const addComment = async (req, res, next) => {
  const newComment = new CommentModel({
    ...req.body,
    userId: req.user.id,
  });
  try {
    const savedComment = await newComment.save();
    res.status(200).json({
      savedComment: savedComment,
    });
  } catch (err) {
    next(err);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const comment = await CommentModel.findById(req.params.id);
    const feed = await feedModel.findById(req.params.id);
    if (req.user.id === comment.userId || req.user.id === feed.userId) {
      await CommentModel.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message: "The Comment has been deleted Successfully!",
      });
    } else {
      return next(createError(403, "You can delete Only Your Comment!"));
    }
  } catch (err) {
    next(err);
  }
};

const getComments = async (req, res, next) => {
  try {
    const comments = await CommentModel.find({ feedId: req.params.feedId });
    res.status(200).json({
      comments: comments,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addComment,
  deleteComment,
  getComments,
};
