const Task = require("../models/taskModel");

const getTasks = async () => {
  return await Task.find();
};

const createTask = async (taskData) => {
  const task = new Task(taskData);
  return await task.save();
};

const updateTask = async (taskId, taskData) => {
  return await Task.findByIdAndUpdate(taskId, taskData, { new: true });
};

const deleteTask = async (taskId) => {
  return await Task.findByIdAndDelete(taskId);
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
