const jwt = require("jsonwebtoken");
const UserModel = require("../Models/UserModel");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ message: "You are not logged in" });
    }

    await jwt.verify(token, process.env.SECRET_TOKEN, async (err, payload) => {
      if (err) {
        return res.status(403).json({ message: "Token is not valid" });
      }
      req.user = payload;
      req.userId = payload.id;
      req.username = payload.username;
      req.profileImage = payload.profileImage;
      req.admissions = payload.admissions;

      next();
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Invalid Token");
  }
};

module.exports = verifyToken;
