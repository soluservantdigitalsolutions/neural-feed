const UserModel = require("../Models/UserModel.js");
const feedModel = require("../Models/feed.model.js");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./client/public");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const postFeed = async (req, res) => {
  //   const username = UserModel.findOne({ username });
  try {
    const newFeed = await feedModel.create({
      userId: req.userId,
      username: req.username,
      video: req.file.video,
      ...req.body,
    });

    //  await feedModel.bulkSave()
    res.status(200).json({
      feed: newFeed,
    });
  } catch (err) {
    console.log(err.message);
  }
};

const getFeed = async (req, res) => {
  try {
    const feeds = await feedModel.find();
    res.status(200).json({
      feeds: feeds,
    });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  postFeed,
  getFeed,
  upload,
};
