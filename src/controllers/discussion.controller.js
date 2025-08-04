import Discussion from '../models/Discussion.js';

export const createDiscussion = async (req, res) => {
    const discussion = await Discussion.create({ ...req.body, user: req.user._id });
    res.status(201).json(discussion);
};

export const getDiscussions = async (req, res) => {
    const filter = req.query.project ? { project: req.query.project } : {};
    const discussions = await Discussion.find(filter).populate('user', 'name');
    res.json(discussions);
};

export const deleteDiscussion = async (req, res) => {
    await Discussion.findByIdAndDelete(req.params.id);
    res.json({ message: 'Discussion deleted' });
};
