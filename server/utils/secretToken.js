const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

const createSecretToken = (_id) => {
  return jwt.sign({ _id }, process.env.TOKEN_KEY, {
    expiresIn: "3d"
  });
};

module.exports = createSecretToken;
