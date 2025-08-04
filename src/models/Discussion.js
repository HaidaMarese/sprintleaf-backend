import mongoose from 'mongoose';

const discussionSchema = new mongoose.Schema({
    content: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
}, { timestamps: true });

export default mongoose.model('Discussion', discussionSchema);
