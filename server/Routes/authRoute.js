const router = require("express").Router();
const { Register, Login } = require("../Controllers/AuthController.js");
const User = require("../Models/UserModel.js");

//Implementing auth Routes


router.post("/register", Register);

router.post("/login", Login)

module.exports = router;
