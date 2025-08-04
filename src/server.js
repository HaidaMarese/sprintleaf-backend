import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import { errorHandler, notFound } from './middleware/error.js';

import authRoutes from './routes/auth.routes.js';
import projectRoutes from './routes/project.routes.js';
import taskRoutes from './routes/task.routes.js';
import courseRoutes from './routes/course.routes.js';
import noteRoutes from './routes/note.routes.js';
import discussionRoutes from './routes/discussion.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/discussions', discussionRoutes);


app.get('/', (req, res) => {
  res.send('SprintLeaf API is running...');
});


app.use(notFound);
app.use(errorHandler);

connectDB(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () =>
    console.log(`🌍 Server listening at http://localhost:${PORT}`)
  );
}).catch((err) => {
  console.error('❌ Failed to connect to DB:', err.message);
});
