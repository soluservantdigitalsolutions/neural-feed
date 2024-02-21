/* eslint-disable no-undef */
const UserModel = require("../Models/UserModel.js");
const feedModel = require("../Models/feed.model.js");
const createError = require("../error.js");

const postFeed = async (req, res, next) => {
  try {
    const newFeed = await feedModel.create({
      userId: req.userId,
      username: req.username,
      video: req.body.video,
      description: req.body.description,
      profileImage: req.profileImage,
      admissions: req.admissions,
      tests: req.body.tests,
      category: req.body.category,
      thumbnail: req.body.thumbnail,
      ...req.body,
    });

    await newFeed.save();

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
      const upload = parser.single("thumbnail");
      upload(req, res, async (err) => {
        if (err) {
          return next(createError(500, err.message));
        }

        const updatedFeedData = {
          ...req.body,
          thumbnail: req.file ? req.file.path : feed.thumbnail,
        };

        const updatedFeed = await feedModel.findByIdAndUpdate(
          req.params.id,
          { $set: updatedFeedData },
          { new: true }
        );

        res.status(200).json({
          updatedFeed: updatedFeed,
        });
      });
    } else {
      return next(createError(403, "You can update only your video!"));
    }
  } catch (err) {
    console.log(err.message);
    next(err);
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

    const attendedFeed = await feedModel.findByIdAndUpdate(req.params.id, {
      $push: { attendances: req.user.id },
    });
    res.status(200).json({
      message: "You have an additional attendance",
      attendedFeed: attendedFeed,
    });
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
  try {
    const searchQuery = req.query.q; // Assuming the query parameter is named 'q'
    if (!searchQuery) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // Perform a text search using the text index
    const feeds = await feedModel.find({
      $text: { $search: searchQuery },
    });

    res.status(200).json(feeds);
  } catch (err) {
    next(createError(500, err.message));
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
