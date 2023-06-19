const router = require("express").Router();
const dotenv = require("dotenv");
const { postFeed } = require("../Controllers/Feed.controller.js");
dotenv.config();

router.post("/feeds", postFeed);

router.get("/feeds", (req, res) => {
  res.json({ message: "get all feeds" });
});

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
