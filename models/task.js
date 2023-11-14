const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: Boolean,
    required: true,
  },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
