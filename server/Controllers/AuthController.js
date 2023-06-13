const UserModel = require("../Models/UserModel");
const createSecretToken = require("../utils/secretToken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const Register = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    const existingUser = await UserModel.findOne({ email });
    // const existingUsername = await UserModel.findOne({ username });
    if (existingUser) {
      return res.json({ message: "User Already Exists" });
    }

    const newUser = await UserModel.create({
      username,
      email,
      password,
      confirmPassword,
    });
    const token = createSecretToken(newUser._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    // res.status(201).json(message : "user was created successfully")
    res.status(200).send("User was created");
    next();
  } catch (err) {
    res.status(500).send("User couldn't be Created");
    console.log(err);
  }
};

const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).json({ message: "All fields are required!" });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect Email or Password!" });
    }
    const userPassword = await bcrypt.compare(password, user.password);
    if (!userPassword) {
      return res.json({ message: "Incorrect Password or Email" });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User has been logged in successfully", success: true });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  Register,
  Login,
};
