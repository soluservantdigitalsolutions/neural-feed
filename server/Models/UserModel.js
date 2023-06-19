const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Your Username is Required"],
      unique: true,
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
    enrollments: {
      type: String,
      default: 0,
    },
    hats: {
      type: String,
      default: 0,
    },
    students: {
      type: String,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
