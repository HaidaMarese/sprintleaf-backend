import express from 'express';
import {
  createProject, getProjects, getProject, updateProject, deleteProject, inviteUser
} from '../controllers/project.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .post(createProject)
  .get(getProjects);

router.route('/:id')
  .get(getProject)
  .patch(updateProject)
  .delete(deleteProject);

router.post('/:id/invite', inviteUser);

export default router;
