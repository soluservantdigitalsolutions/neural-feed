const UserModel = require("../Models/UserModel");
const createSecretToken = require("../utils/secretToken");

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

const Login = async (req, res) => {};

module.exports = {
  Register,
  Login,
};
