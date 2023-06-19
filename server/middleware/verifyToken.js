const jwt = require("jsonwebtoken");
const UserModel = require("../Models/UserModel");

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ error: "Authorization token is required" });
  }

  if (typeof req.headers.authorization !== "string") {
    res.sendStatus(400);
    return;
  }

  var tokens = req.headers.authorization.split(" ");

  if (tokens.length < 2) {
    res.sendStatus(400);
    return;
  }

  var token = tokens[1];


  try {
    const { _id } = jwt.verify(token, process.env.TOKEN_KEY);

    req.user = await UserModel.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = verifyToken;
