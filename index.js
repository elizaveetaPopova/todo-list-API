const express = require("express");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/task-routes");

const PORT = 3000;
const URL = "mongodb://localhost:27017/todo-tasks";

const app = express();

app.use(express.json());
app.use(taskRoutes);

mongoose
  .connect(URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(`DB connection error ${err}`);
  });

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Listening port ${PORT}`);
});
