const {
  updateUser,
  deleteUser,
  getUser,
  enroll,
  dropOut,
} = require("./Controllers/user.controller");
const UserModel = require("./Models/UserModel");
const feedModel = require("./Models/feed.model");
const { createError } = require("./error");
const verifyToken = require("./middleware/verifyToken");

const router = require("express").Router();
//Update a User
router.put("/:id", verifyToken, updateUser);

//Delete A user
router.delete("/:id", verifyToken, deleteUser);

//Get A User
router.get("/:id", getUser);

//enroll a neural feeder
router.put("/enroll/:id", verifyToken, enroll);

//dropOut a receiver
router.put("/dropout/:id", verifyToken, dropOut);

//comprehend a feed
router.put("/comprehend/:feedId", verifyToken, dropOut);

//confused by a feed
router.put("/confusion/:feedId", verifyToken, dropOut);

module.exports = router;
