const express = require("express");
const router = express.Router();
const {
  postNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
  addAttendances,
  updateComprehensionAndHats,
} = require("./Controllers/note.controller.js");
const { parser } = require("./config/cloudinary.js");
const verifyToken = require("./middleware/verifyToken.js");

router.post(
  "/create-note",
  verifyToken,
  parser.single("image"),
  express.json(),
  postNote
);
router.get("/", getNotes);
router.get("/:id", getNote);
router.put("/:id", verifyToken, updateNote);
router.delete("/:id", verifyToken, deleteNote);
3;

router.post("/:id/attendances", verifyToken, addAttendances);
router.put(
  "/:id/comprehensionAndHats",
  verifyToken,
  updateComprehensionAndHats
);

module.exports = router;
