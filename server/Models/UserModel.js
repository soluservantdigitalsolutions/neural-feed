const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const bcrypt = require("bcrypt");

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
    confirmPassword: {
      type: String,
      required: [true, "Your Confirm Password is Required"],
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = await bcrypt.hash(this.confirmPassword, 12);
});

module.exports = mongoose.model("User", UserSchema);
