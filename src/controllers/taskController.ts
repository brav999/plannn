import { Request, Response } from 'express';
import Task from '../models/taskModel';

// Interface para o modelo de Task
interface ITask {
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  createdAt?: Date;
  updatedAt?: Date;
}

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const taskData: ITask = req.body;
    const newTask = new Task(taskData);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(400).json({ message: 'Error creating task' });
  }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const taskId = req.params.id;
    const updateData: Partial<ITask> = req.body;
    
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(400).json({ message: 'Error updating task' });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(400).json({ message: 'Error deleting task' });
  }
};