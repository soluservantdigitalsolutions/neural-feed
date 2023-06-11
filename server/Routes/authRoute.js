const router = require("express").Router();
const { Register } = require("../Controllers/AuthController.js");
const User = require("../Models/UserModel.js");

router.post("/register", Register);

module.exports = router;
