const express = require("express");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/task-routes");
const authRoutes = require("./routes/auth-routes");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
    optionSuccessStatus: 200,
  })
);
app.use(taskRoutes);
app.use(authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(`DB connection error ${err}`);
  });

app.listen(process.env.PORT, (err) => {
  err ? console.log(err) : console.log(`Listening port ${process.env.PORT}`);
});
