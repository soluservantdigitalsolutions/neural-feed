/* eslint-disable no-undef */
const UserModel = require("../Models/UserModel");
const feedModel = require("../Models/feed.model");
const createError = require("../error");

const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({
        updatedUser: updatedUser,
      });
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can update only your account!"));
  }
};

const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await UserModel.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message: "User has been deleted!",
      });
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can delete only your account!"));
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.status(200).json({
      user: user,
      message: "User has been found Successfully!",
    });
  } catch (err) {
    next(err);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ username: req.params.username });
    if (!user) {
      return next(createError(404, "User not found"));
    }
    res.status(200).json({
      user: user,
      message: "User has been found Successfully!",
    });
  } catch (err) {
    next(err);
  }
};

const enroll = async (req, res, next) => {
  try {
    if (req.user.id === req.params.id) {
      return res.status(400).json({
        message: "Feed owner cannot enroll or admit themselves.",
      });
    }

    const user = await UserModel.findById(req.user.id);
    const feedOwner = await UserModel.findById(req.params.id);

    if (
      user.enrollments.includes(req.params.id) ||
      feedOwner.admissions.includes(req.user.id)
    ) {
      return res.status(400).json({
        message:
          "User is already enrolled. Please use the dropOut controller to unenroll before enrolling again.",
      });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user.id,
      {
        $push: { enrollments: req.params.id },
      },
      {
        new: true,
      }
    );
    const updatedFeedOwner = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: { admissions: req.user.id },
      },
      {
        new: true,
      }
    );
    
    res.status(200).json({
      message: "User has been Enrolled Successfully",
      updatedUser,
      updatedFeedOwner,
    });
  } catch (err) {
    next(err);
  }
};



const dropOut = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user.id);
    const feedOwner = await UserModel.findById(req.params.id);

    if (
      !user.enrollments.includes(req.params.id) ||
      !feedOwner.admissions.includes(req.user.id)
    ) {
      return res.status(400).json({
        message:
          "User is not enrolled. Please use the enroll controller to enroll before dropping out.",
      });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user.id,
      {
        $pull: { enrollments: req.params.id },
      },
      {
        new: true,
      }
    );
    const updatedFeedOwner = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { admissions: req.user.id },
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      message: "User has been dropped out Successfully",
      updatedUser,
      updatedFeedOwner,
    });
  } catch (err) {
    next(err);
  }
};

const comprehensions = async (req, res, next) => {
  const id = req.user.id;
  const feedId = req.params.feedId;
  try {
    const comprehendedFeed = await feedModel.findByIdAndUpdate(
      feedId,
      {
        $addToSet: { comprehensions: id },
        $pull: { confusions: id },
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      message: "This feed has been Comprehended",
      comprehendedFeed,
    });
  } catch (err) {
    next(err);
  }
};

const confusions = async (req, res, next) => {
  const id = req.user.id;
  const feedId = req.params.feedId;
  try {
    await feedModel.findByIdAndUpdate(
      feedId,
      {
        $addToSet: { confusions: id },
        $pull: { comprehensions: id },
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      message: "This feed confused a user",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getUser,
  enroll,
  dropOut,
  comprehensions,
  confusions,
  getUserProfile,
};
