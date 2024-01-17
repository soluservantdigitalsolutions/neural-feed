/* eslint-disable no-undef */
const UserModel = require("../Models/UserModel.js");
const feedModel = require("../Models/feed.model.js");
const createError = require("../error.js");
const { parser } = require("../config/cloudinary.js");

const postFeed = async (req, res, next) => {
  try {
    const newFeed = await feedModel.create({
      userId: req.userId,
      username: req.username,
      video: req.body.video, // Here
      description: req.body.description,
      profileImage: req.profileImage,
      admissions: req.admissions,
      tests: req.body.tests, // Make sure this is an array
      category: req.body.category,
      ...req.body,
    });

    // Update the user's admissions field
    const user = await UserModel.findById(req.userId);
    user.admissions.push(newFeed._id);

    await user.save();

    res.status(200).json({
      feed: newFeed,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getFeeds = async (req, res) => {
  try {
    const feeds = await feedModel.find();
    res.status(200).json({
      feeds: feeds,
    });
    const attendanceCount = feedModel.findOne({
      attendances: req.body.attendances,
    });
  } catch (err) {
    console.log(err.message);
  }
};

const updateFeed = async (req, res, next) => {
  try {
    const feed = await feedModel.findById(req.params.id);
    if (!feed) return next(createError(404, "Feed Not Found!"));
    if (req.user.id === feed.userId) {
      const updatedVideo = await feedModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json({
        updatedVideo: updatedVideo,
      });
    } else {
      return next(createError(403, "You can update only your video!"));
    }
  } catch (err) {
    console.log(err.message);
  }
};

const deleteFeed = async (req, res, next) => {
  try {
    const feed = await feedModel.findById(req.params.id);
    if (!feed) return next(createError(404, "Feed Not Found!"));
    if (req.user.id === feed.userId) {
      await feedModel.findByIdAndDelete(req.params.id);

      res.status(200).json({
        message: "Feed has been deleted successfully!",
      });
    } else {
      return next(createError(403, "You can update only your video!"));
    }
  } catch (err) {
    console.log(err.message);
  }
};

const getFeed = async (req, res, next) => {
  try {
    const feed = await feedModel.findById(req.params.id);
    const feedOwner = await UserModel.findById(req.params.id);
    res.status(200).json({
      singleFeed: feed,
    });
  } catch (err) {
    next(err);
  }
};

const getFeedOwner = async (req, res, next) => {
  try {
    const feedOwner = await UserModel.findById(req.params.id);
    res.status(200).json({
      feedOwner: feedOwner,
    });
  } catch (err) {
    next(err);
  }
};

const addAttendances = async (req, res, next) => {
  try {
    // Find the feed
    const feed = await feedModel.findById(req.params.id);
    if (!feed) {
      return next(createError(404, "Feed not found!"));
    }

    // Check if user's ID already exists in the attendances array
    if (!feed.attendances.includes(req.user.id)) {
      // If not, check if the user has already attended 5 times
      if (
        feed.attendances.filter((attendance) => attendance === req.user.id)
          .length >= 5
      ) {
        return res.status(400).json({
          message: "You have already attended this feed 5 times",
        });
      }

      // If not, push user's ID
      const attendedFeed = await feedModel.findByIdAndUpdate(req.params.id, {
        $push: { attendances: req.user.id },
      });
      res.status(200).json({
        message: "You have an additional attendance",
        attendedFeed: attendedFeed,
      });
    } else {
      // If user's ID already exists, do nothing
      res.status(200).json({
        message: "You have already attended this feed",
      });
    }
  } catch (err) {
    next(err);
  }
};

const randomFeeds = async (req, res, next) => {
  try {
    const feeds = await feedModel.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json({
      randomFeeds: feeds,
    });
  } catch (err) {
    next(err);
  }
};

const trendingFeeds = async (req, res, next) => {
  try {
    const feed = await feedModel.find().sort({ attendances: -1 });
    res.status(200).json({
      singleFeed: feed,
    });
  } catch (err) {
    next(err);
  }
};

const enrolledFeeds = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user.id);
    const enrolledFeeds = user.enrollments;

    const list = await Promise.all(
      enrolledFeeds.map((feederId) => {
        return feedModel.find({ userId: feederId });
      })
    );
    res.status(200).json({
      enrolledFeeds: list.flat().sort((a, b) => b.createdAt - a.createdAt),
    });
  } catch (err) {
    next(err);
  }
};

const getByTags = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  try {
    const feeds = await feedModel
      .find()
      .sort({ tags: { $in: tags } })
      .limit(20);
    res.status(200).json({
      queryResults: feeds,
    });
  } catch (err) {
    next(err);
  }
};

const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const feeds = await feedModel
      .find({ title: { $regex: query, $options: "i" } })
      .limit(40);
    res.status(200).json({
      queryResults: feeds,
    });
  } catch (err) {
    next(err);
  }
};

const updateComprehensionAndHats = async (req, res, next) => {
  try {
    // Get selected options and feed id from request body
    const { selectedOptions, feedId } = req.body;

    // Find the feed
    const feed = await feedModel.findById(feedId);
    if (!feed) {
      return next(createError(404, "Feed not found!"));
    }

    // Compare selected options with feed answers
    const correctAnswers = feed.tests.filter(
      (test, index) => selectedOptions[test.question] === test.answer
    ).length;
    const totalQuestions = feed.tests.length;

    if (correctAnswers === totalQuestions) {
      // Update feed's Comprehension array
      const updatedFeed = await feedModel.findByIdAndUpdate(
        feedId,
        {
          $addToSet: { comprehensions: req.user.id },
        },
        { new: true }
      );

      const user = await UserModel.findById(req.user.id);
      if (!Array.isArray(user.hats)) {
        user.hats = [];
        await user.save();
      }

      // Update user's hats array
      const updatedUser = await UserModel.findByIdAndUpdate(
        req.user.id,
        {
          $addToSet: { hats: feedId },
        },
        { new: true }
      );

      // Send response
      res.status(200).json({
        message: "Updated successfully!",
        updatedFeed,
        updatedUser,
        correctAnswers,
        totalQuestions,
      });
    } else {
      res.status(200).json({
        message: "Selected options do not match the feed answers.",
        correctAnswers,
        totalQuestions,
      });
    }
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const getUserFeeds = async (req, res, next) => {
  try {
    // Get the username from the request parameters
    const { username } = req.params;

    // Query the database for the user's feeds
    const userFeeds = await feedModel.find({ username: username });

    // Send the user's feeds as a response
    res.status(200).json({
      feeds: userFeeds,
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

module.exports = {
  postFeed,
  getFeeds,
  updateFeed,
  deleteFeed,
  getFeed,
  addAttendances,
  randomFeeds,
  trendingFeeds,
  enrolledFeeds,
  getByTags,
  search,
  updateComprehensionAndHats,
  getUserFeeds,
  getFeedOwner,
};
