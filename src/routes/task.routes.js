import express from 'express';
import {
  createTask, getTasks, updateTask, deleteTask
} from '../controllers/task.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
router.use(protect);

router.route('/')
  .get(getTasks)
  .post(createTask);

router.route('/:id')
  .patch(updateTask)
  .delete(deleteTask);

export default router;
