import Project from '../models/Project.js';
import Task from '../models/Task.js';
import User from '../models/User.js';

export const createProject = async (req, res) => {
  const project = await Project.create({ ...req.body, owner: req.user._id });
  res.status(201).json(project);
};

export const getProjects = async (req, res) => {
  const projects = await Project.find({ $or: [{ owner: req.user._id }, { collaborators: req.user._id }] });
  res.json(projects);
};

export const getProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  const tasks = await Task.find({ project: req.params.id });
  res.json({ project, tasks });
};

export const updateProject = async (req, res) => {
  const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: 'Project deleted' });
};

export const inviteUser = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  const project = await Project.findById(req.params.id);
  if (!user || !project) return res.status(404).json({ message: 'Not found' });

  if (!project.collaborators.includes(user._id)) {
    project.collaborators.push(user._id);
    await project.save();
  }

  if (!user.invitedProjects.includes(project._id)) {
    user.invitedProjects.push(project._id);
    await user.save();
  }

  res.json({ message: 'User invited successfully' });
};
