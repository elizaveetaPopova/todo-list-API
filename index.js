const express = require("express");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/task-routes");
const authRoutes = require("./routes/auth-routes");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());
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
