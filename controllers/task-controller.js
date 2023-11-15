const Task = require("../models/task");

const handleError = (res, error) => {
  res.status(500).json({ error });
};

const getTasks = (req, res) => {
  Task.find()
    .then((tasks) => {
      res.status(200).json(tasks);
    })
    .catch(() => handleError(res, "Something goes wrong..."));
};

const getTask = (req, res) => {
  Task.findById(req.params.id)
    .then((task) => {
      res.status(200).json(task);
    })
    .catch(() => handleError(res, "Something goes wrong..."));
};

const deleteTask = (req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => handleError(res, "Something goes wrong..."));
};

const addTask = (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch(() => handleError(res, "Something goes wrong..."));
};

const updateTask = (req, res) => {
  Task.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => handleError(res, "Something goes wrong..."));
};

module.exports = {
  getTasks,
  getTask,
  deleteTask,
  addTask,
  updateTask,
};
