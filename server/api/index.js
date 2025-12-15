import { Router } from 'express';

import authRouter from './auth.js';
import healthRouter from './health.js';
import postsRouter from './posts.js';
import commentsRouter from './comments.js';
import likesRouter from './likes.js';
import usersRouter from './users.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/healthz', healthRouter);

router.use('/posts', postsRouter);
router.use('/comments', commentsRouter);
router.use('/likes', likesRouter);
router.use('/users', usersRouter);

export default router;