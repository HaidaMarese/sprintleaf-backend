import Course from '../models/course.js';

export const createCourse = async (req, res) => {
    const course = await Course.create({ ...req.body, owner: req.user._id });
    res.status(201).json(course);
};

export const getCourses = async (req, res) => {
    const courses = await Course.find({ owner: req.user._id });
    res.json(courses);
};

export const getCourse = async (req, res) => {
    const course = await Course.findById(req.params.id);
    res.json(course);
};

export const updateCourse = async (req, res) => {
    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
};

export const deleteCourse = async (req, res) => {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted' });
};
