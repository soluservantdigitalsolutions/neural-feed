const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./Routes/authRoute.js");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const feedsRoute = require("./Routes/feedsRoute.js");
const requestAndRequestPathLogger = require("./middleware/requestLog.js");
dotenv.config();

//middlewares

mongoose.set("strictQuery", true);
app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: ["https://neural-feed.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
requestAndRequestPathLogger();
app.get("/", (req,res)=>{
  res.send("Server is running")
})
app.use("/api/auth", authRoute);
app.use("/api/upload", feedsRoute);

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
