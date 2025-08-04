import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    content: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
}, { timestamps: true });

export default mongoose.model('Note', noteSchema);
