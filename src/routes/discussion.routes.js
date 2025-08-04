import express from 'express';
import {
    createDiscussion, getDiscussions, deleteDiscussion
} from '../controllers/discussion.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getDiscussions)
    .post(createDiscussion);

router.delete('/:id', deleteDiscussion);

export default router;
