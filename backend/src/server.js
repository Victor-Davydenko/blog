import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import path from 'node:path';
import cors from 'cors';
import router from './routes/index.js';
import authStrategy from './middlewares/passportMiddleware.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';

const app = express();

app.set('view engine', 'pug');
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000',
}));
app.use(json());
app.use(cookieParser());
app.use('/', router);
app.use(passport.initialize());
authStrategy(passport);
app.use(express.static(path.resolve('public/')));
app.use(notFoundMiddleware, errorMiddleware);

export { app };
