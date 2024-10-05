// src/models/taskModel.ts
import mongoose from 'mongoose';

interface Task {
  title: string;
  description?: string; // Optional property
  completed: boolean;
  createdAt: Date;
}

const taskSchema = new mongoose.Schema<Task>({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model<Task>('Task', taskSchema);

export default Task;
