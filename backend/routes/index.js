const express = require("express");
const Task = require("../models/task");
const router = express.Router();

router.get("/tasks", async (req, res) => {
  const { status, sortBy, sortOrder } = req.query;
  let sortOption = { createdAt: 1 };
  if (sortBy && sortOrder) {
    sortOption = { [sortBy]: sortOrder === "desc" ? -1 : 1 };
  }
  const query = {};
  if (status) {
    query.status = status;
  }
  const tasks = await Task.find(query).sort(sortOption);
  res.status(200).json({ data: tasks });
});

router.get("/task/:id", async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOne({ _id: id });
  res.status(200).json({ data: task });
});

router.post("/task", async (req, res) => {
  const reqBody = req.body;
  const newTask = new Task(reqBody);
  let task = await newTask.save();
  task = await Task.find({});
  res.status(201).json({ data: task });
});

router.put("/task/:id", async (req, res) => {
  const reqBody = req.body;
  const { id } = req.params;
  let task = await Task.findOneAndUpdate({ _id: id }, reqBody);
  task = await Task.find({});
  res.status(200).json({ data: task });
});

router.post("/deleteTaskByIds", async (req, res) => {
  const { ids } = req.body;
  let task = await Task.deleteMany({ _id: { $in: ids } });
  task = await Task.find({});
  res.status(200).json({ data: task });
});

module.exports = router;
