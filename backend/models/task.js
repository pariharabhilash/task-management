const mongoose = require("mongoose");
const { TASK_STATUS } = require("../constants");

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: TASK_STATUS,
      default: TASK_STATUS[0],
    },
    dueDate: {
      type: Date,
      min: Date.now,
      required: true,
    },
    assignedTo: {
      type: String,
    },
    createdBy: {
      type: String,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
