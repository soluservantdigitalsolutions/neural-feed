const router = require("express").Router();
const dotenv = require("dotenv");
const { postFeed, getFeed } = require("../Controllers/Feed.controller.js");
const verifyToken = require("../middleware/verifyToken.js");
const { upload } = require("../Controllers/Feed.controller.js");
dotenv.config();

router.post("/feeds", verifyToken, upload.single("video"), postFeed);

router.get("/feeds", getFeed);

router.get("/feeds/id:", (req, res) => {
  res.json({ message: "get a single feed" });
});

router.delete("/feeds/id:", (req, res) => {
  res.json({ message: "delete a single feed" });
});

router.put("/feeds/id:", (req, res) => {
  res.json({ message: "update a single document" });
});

module.exports = router;
