import express from 'express';
import {
    createNote, getNotes, deleteNote
} from '../controllers/note.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.route('/')
    .post(createNote)
    .get(getNotes);

router.delete('/:id', deleteNote);

export default router;
