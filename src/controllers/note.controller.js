import mongoose from 'mongoose';
import Note from '../models/Note.js';

export const createNote = async (req, res) => {
    try {
        const { project, course, ...rest } = req.body;

        const noteData = {
            ...rest,
            owner: req.user._id,
            project: project && mongoose.Types.ObjectId.isValid(project) ? project : undefined,
            course: course && mongoose.Types.ObjectId.isValid(course) ? course : undefined,
        };

        const note = await Note.create(noteData);
        res.status(201).json(note);
    } catch (error) {
        res.status(400).json({ message: error.message || 'Failed to create note' });
    }
};

export const getNotes = async (req, res) => {
    const query = { owner: req.user._id };
    if (req.query.project) query.project = req.query.project;
    if (req.query.course) query.course = req.query.course;
    const notes = await Note.find(query);
    res.json(notes);
};

export const updateNote = async (req, res) => {
    try {
        const { project, course, ...rest } = req.body;

        const noteData = {
            ...rest,
            project: project && mongoose.Types.ObjectId.isValid(project) ? project : undefined,
            course: course && mongoose.Types.ObjectId.isValid(course) ? course : undefined,
        };

        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, owner: req.user._id },
            noteData,
            { new: true, runValidators: true }
        );

        if (!note) {
            return res.status(404).json({ message: "Note not found or you don't have permission" });
        }

        res.json(note);
    } catch (error) {
        res.status(400).json({ message: error.message || 'Failed to update note' });
    }
};

export const deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted' });
};
