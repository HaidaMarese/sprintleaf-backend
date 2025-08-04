import express from 'express';
import {
  createCourse, getCourses, getCourse, updateCourse, deleteCourse
} from '../controllers/course.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
router.use(protect);

router.route('/')
  .post(createCourse)
  .get(getCourses);

router.route('/:id')
  .get(getCourse)
  .patch(updateCourse)
  .delete(deleteCourse);

export default router;
