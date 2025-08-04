import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
    startDate: Date,
    endDate: Date,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default mongoose.model('Course', courseSchema);
