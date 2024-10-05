// src/controllers/taskController.ts
import Task from '../models/taskModel';

const getTasks = async (req: any, res: any) => {
  // Update request and response types
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};

const createTask = async (req: any, res: any) => {
  // Update request and response types
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: 'Error creating task' });
  }
};

export default { getTasks, createTask };
