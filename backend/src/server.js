import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import router from './routes/index.js';
import authStrategy from './middlewares/passportMiddleware.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';

const app = express();

app.use(json());
app.use(cookieParser());
app.use('/', router);
app.use(passport.initialize());
authStrategy(passport);
app.use(notFoundMiddleware, errorMiddleware);

export { app };
