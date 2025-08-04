import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, enum: ['todo', 'in progress', 'done'], default: 'todo' },
  dueDate: Date,
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);
