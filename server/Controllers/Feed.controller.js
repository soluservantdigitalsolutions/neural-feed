const UserModel = require("../Models/UserModel.js");
const feedModel = require("../Models/feed.model.js");

const postFeed = async (req, res) => {
  //   const username = UserModel.findOne({ username });
  try {
    const newFeed = await feedModel.create({
      userId: req.userId,
      username: req.username,
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

const getFeed = async (req, res) => {};

module.exports = {
  postFeed,
  getFeed,
};
