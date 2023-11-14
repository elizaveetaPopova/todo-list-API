const express = require("express");
const mongoose = require("mongoose");
const Task = require("./models/task");
const PORT = 3000;
const URL = "mongodb://localhost:27017/todo-tasks";

const app = express();
app.use(express.json());

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

const handleError = (res, error) => {
  res.status(500).json({ error });
};

app.get("/tasks", (req, res) => {
  Task.find()
    .then((tasks) => {
      res.status(200).json(tasks);
    })
    .catch(() => handleError(res, "Something goes wrong..."));
});

app.get("/tasks/:id", (req, res) => {
  Task.findById(req.params.id)
    .then((task) => {
      res.status(200).json(task);
    })
    .catch(() => handleError(res, "Something goes wrong..."));
});

app.delete("/tasks/:id", (req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => handleError(res, "Something goes wrong..."));
});

app.post("/tasks", (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch(() => handleError(res, "Something goes wrong..."));
});

app.patch("/tasks/:id", (req, res) => {
  Task.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch(() => handleError(res, "Something goes wrong..."));
});
