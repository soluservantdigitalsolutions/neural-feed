const router = require("express").Router();
const { Register, Login, Logout } = require("./Controllers/AuthController.js");
const { parser } = require("./config/cloudinary");
router.post("/register", parser.single("profileImage"), Register);
router.post("/login", Login);
router.post("/logout", Logout);

module.exports = router;
