const {
  addComment,
  deleteComment,
  getComments,
} = require("./Controllers/comment.controller");
const verifyToken = require("./middleware/verifyToken");

const router = require("express").Router();

router.post("/", verifyToken, addComment);

router.delete("/:id", verifyToken, deleteComment);

router.get("/:feedId", verifyToken, getComments);

module.exports = router;
  