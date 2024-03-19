import { Router } from 'express';
import userRouter from './user/userRouter.js';
import postRouter from './post/postRouter.js';

const router = Router();

router.use(userRouter);
router.use(postRouter);

export default router;
