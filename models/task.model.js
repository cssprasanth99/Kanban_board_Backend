const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: {
    type: String,
    enum: ["to-do", "in-progress", "completed"],
    default: "to-do",
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
