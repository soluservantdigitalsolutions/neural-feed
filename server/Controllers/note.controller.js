const NoteModel = require("../Models/note.model.js");
const UserModel = require("../Models/UserModel.js")
const createError = require("../error.js");

const postNote = async (req, res, next) => {
  try {
    const imageUrl = req.file ? req.file.path : null;
    const tests = JSON.parse(req.body.tests);

 const newNote = await NoteModel.create({
   authorId: req.userId,
   authorName: req.username,
   profileImage: req.profileImage,
   title: req.body.title,
   content: req.body.content,
   tags: req.body.tags,
   tests: tests,
   imageUrl: imageUrl,
   category: req.body.category, // Add this line
 });

    res.status(201).json(newNote);
  } catch (err) {
    next(createError(500, err.message));
  }
};

const getNotes = async (req, res, next) => {
  try {
    const notes = await NoteModel.find();
    res.status(200).json(notes);
  } catch (err) {
    next(createError(500, err.message));
  }
};

const getNote = async (req, res, next) => {
  try {
    const note = await NoteModel.findById(req.params.id);
    if (!note) return next(createError(404, "Note not found"));
    res.status(200).json(note);
  } catch (err) {
    next(createError(500, err.message));
  }
};

const updateNote = async (req, res, next) => {
  try {
    const note = await NoteModel.findById(req.params.id);
    if (!note) return next(createError(404, "Note not found"));
    if (req.userId !== note.authorId)
      return next(createError(403, "Unauthorized"));

    const updatedNote = await NoteModel.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        tests: req.body.tests, // Update tests here
      },
      { new: true }
    );
    res.status(200).json(updatedNote);
  } catch (err) {
    next(createError(500, err.message));
  }
};

const deleteNote = async (req, res, next) => {
  try {
    const note = await NoteModel.findById(req.params.id);
    if (!note) return next(createError(404, "Note not found"));
    if (req.userId !== note.authorId)
      return next(createError(403, "Unauthorized"));

    await NoteModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    next(createError(500, err.message));
  }
};

const updateComprehensionAndHats = async (req, res, next) => {
  try {
    // Get selected options and note id from request body
    const { selectedOptions, noteId } = req.body;

    // Find the note
    const note = await NoteModel.findById(noteId);
    if (!note) {
      return next(createError(404, "Note not found!"));
    }

    // Compare selected options with note answers
    const correctAnswers = note.tests.filter(
      (test, index) => selectedOptions[test.question] === test.answer
    ).length;
    const totalQuestions = note.tests.length;

    if (correctAnswers === totalQuestions) {
      // Update note's Comprehension array
      const updatedNote = await NoteModel.findByIdAndUpdate(
        noteId,
        {
          $addToSet: { comprehensions: req.user.id },
        },
        { new: true }
      );

      const user = await UserModel.findById(req.user.id);
      if (!Array.isArray(user.hats)) {
        user.hats = [];
        await user.save();
      }

      // Update user's hats array
      const updatedUser = await UserModel.findByIdAndUpdate(
        req.user.id,
        {
          $addToSet: { hats: noteId },
        },
        { new: true }
      );

      // Send response
      res.status(200).json({
        message: "Updated successfully!",
        updatedNote,
        updatedUser,
        correctAnswers,
        totalQuestions,
      });
    } else {
      res.status(200).json({
        message: "Selected options do not match the note answers.",
        correctAnswers,
        totalQuestions,
      });
    }
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const addAttendances = async (req, res, next) => {
  try {
    // Find the note
    const note = await NoteModel.findById(req.params.id);
    if (!note) {
      return next(createError(404, "Note not found!"));
    }

    // Check if user's ID already exists in the attendances array
    if (!note.attendances.includes(req.user.id)) {
      // If not, check if the user has already attended 5 times
      if (
        note.attendances.filter((attendance) => attendance === req.user.id)
          .length >= 5
      ) {
        return res.status(400).json({
          message: "You have already attended this note 5 times",
        });
      }

      // If not, push user's ID
      const attendedNote = await NoteModel.findByIdAndUpdate(req.params.id, {
        $push: { attendances: req.user.id },
      });
      res.status(200).json({
        message: "You have an additional attendance",
        attendedNote,
      });
    } else {
      // If user's ID already exists, do nothing
      res.status(200).json({
        message: "You have already attended this note",
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  postNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
  addAttendances,
  updateComprehensionAndHats,
};
