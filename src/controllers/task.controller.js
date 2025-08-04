import Task from '../models/Task.js';

export const createTask = async (req, res) => {
  const task = await Task.create({ ...req.body, owner: req.user._id });
  res.status(201).json(task);
};

export const getTasks = async (req, res) => {
  const filter = req.query.project ? { project: req.query.project } : {};
  const tasks = await Task.find(filter).populate('project');
  res.json(tasks);
};

export const updateTask = async (req, res) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
};
