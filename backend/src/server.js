import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import router from './routes/index.js';

const app = express();

app.use(json());
app.use(cookieParser());
app.use('/', router);

export { app };
