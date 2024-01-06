const router = require("express").Router();
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

router.post("/notes", verifyToken, parser.single("image"), postNote);
router.get("/notes", getNotes);
router.get("/notes/:id", getNote);
router.put("/notes/:id", verifyToken, updateNote);
router.delete("/notes/:id", verifyToken, deleteNote);
3;

router.post("/:id/attendances", verifyToken, addAttendances);
router.put(
  "/:id/comprehensionAndHats",
  verifyToken,
  updateComprehensionAndHats
);

module.exports = router;
