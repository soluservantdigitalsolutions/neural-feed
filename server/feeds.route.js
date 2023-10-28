const router = require("express").Router();
const {
  postFeed,
  getFeeds,
  enrolledFeeds,
  randomFeeds,
  trendingFeeds,
  addAttendances,
  getFeed,
  updateFeed,
  getByTags,
  search,
  awardPoints,
  updateComprehensionAndHats,
} = require("./Controllers/Feed.controller.js");
const verifyToken = require("./middleware/verifyToken.js");

router.post("/feeds", verifyToken, postFeed);

router.put("/feeds/:id", verifyToken, updateFeed);

router.delete("/feeds/:id", verifyToken, updateFeed);

router.get("/feeds", getFeeds);

router.get("/feeds/:id", getFeed);

router.put("/feeds/attendances/:id", verifyToken, addAttendances);

router.get("/trend", trendingFeeds);

router.get("/random", randomFeeds);

router.get("/enrolled", verifyToken, enrolledFeeds);

router.get("/feeds/tags", getByTags);

router.get("/feeds/search", search);

router.post(
  "/updateComprehensionAndHats",
  verifyToken,
  updateComprehensionAndHats
);

module.exports = router;
