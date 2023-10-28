const router = require("express").Router();
const { Register, Login, Logout } = require("../Controllers/AuthController.js");
const User = require("../Models/UserModel.js");
const requireAuth = require("../middleware/verifyToken.js");
//Implementing auth Routes

// router.use(requireAuth);

router.post("/register", Register);

router.post("/login", Login);

router.post("/logout", Logout);

module.exports = router;
