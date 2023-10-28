const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    userId: {
      type: String,
    },
    username: {
      type: String,
      required: [true, "Your Username is Required"],
      unique: [true, "This Username is not available"],
    },
    email: {
      type: String,
      required: [true, "Your Email Address is Required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Your Password Must Match is Required"],
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    profileImage: {
      type: String,
    },
    bio: {
      type: String,
    },
    enrollments: {
      type: Array,
      default: [],
    },
    admissions: {
      type: Array,
      default: [],
    },
    hats: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
