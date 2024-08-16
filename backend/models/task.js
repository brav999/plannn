const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  totalTime: {
    type: Number,
    default: 0,
  },
  responsible: {
    type: String,
    default: null,
  },
  startTime: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("Task", taskSchema);
