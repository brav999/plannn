import Task from '../models/taskModel';

interface TaskData {
  // Define the properties of a Task data object here
}

const getTasks: () => Promise<Task[]> = async () => {
  return await Task.find();
};

const createTask: (taskData: TaskData) => Promise<Task> = async (taskData) => {
  const task = new Task(taskData);
  return await task.save();
};

const updateTask: (
  taskId: string,
  taskData: TaskData,
) => Promise<Task | null> = async (taskId, taskData) => {
  return await Task.findByIdAndUpdate(taskId, taskData, { new: true });
};

const deleteTask: (taskId: string) => Promise<Task | null> = async (taskId) => {
  return await Task.findByIdAndDelete(taskId);
};

export default {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
