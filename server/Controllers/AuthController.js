const User = require("../Models/UserModel");
const createSecretToken = require("../utils/secretToken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const validator = require("validator");
const jwt = require("jsonwebtoken");
dotenv.config();

const Register = async (req, res, next) => {
  try {
    // const { username, email, password } = req.body;

    const passwordHash = bcrypt.hashSync(req.body.password, 10);
    const newUser = new User({
      profileImage: req.body.profileImage,
      ...req.body,
      password: passwordHash,
    });

    const emailExistence = await User.findOne({ email: req.body.email });

    if (emailExistence) {
      return res.status(401).json({ message: "Email Already Exists" });
    }

    const usernameExistence = await User.findOne({
      username: req.body.username,
    });

    if (usernameExistence) {
      return res.status(402).json({ message: "Username has been used" });
    }

    await newUser.save();
    res
      .status(200)
      .json({ message: "user has been created sucessfully", user: newUser });
  } catch (err) {
    res.status("501").json({ message: "User Registration Failed" });
    console.log(err.message);
  }
};

const Login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(401).json({ message: "Username does not exist" });
    }

    const loginPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!loginPassword) {
      return res.status(402).json({ message: "Incorrect Password" });
    }

    const { password, ...userInfo } = user._doc;

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        profileImage: user.profileImage,
        admissions: user.admissions,
      },
      process.env.SECRET_TOKEN
    );

    res.cookie("accessToken", token, {
      httpOnly: true,
  
    });
    res.status(200).json({
      user: userInfo,
      message: "User has Logged In Successfully",
    });
  } catch (err) {
    res.status("501").json({ message: "User Registration Failed" });
    console.log(err.message);
  }
};

const Logout = async (req, res) => {
  await res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: "true",
    })
    .status(200)
    .json({ message: "User has been logged out" });
};

module.exports = {
  Register,
  Login,
  Logout,
};
