const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./routes/auth.route.js");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const feedsRoute = require("./routes/feeds.route.js");
const userRoute = require("./routes/user.route.js");
const commentRoute = require("./routes/comments.route.js");

const requestAndRequestPathLogger = require("./middleware/requestLog.js");
dotenv.config();

//middlewares

mongoose.set("strictQuery", true);
app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
requestAndRequestPathLogger();

app.use("/api/auth", authRoute);
app.use("/api/upload", feedsRoute);
app.use("/api/users", userRoute);
app.use("/api/comments", commentRoute);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something Went Wrong!";
  return res.status(status).json({
    success: false,
    status: status,
    message: message,
  });
});

app.get("/", (res, req)=>{
  res.send("Backend Is running!")
})

app.listen(process.env.PORT || 4000, () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Database is connected");
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(`Server is running on port ${process.env.PORT || 4000}`);
});
