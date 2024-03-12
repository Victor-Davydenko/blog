import express, { json } from 'express';
import cookieParser from 'cookie-parser';

const app = express();

app.use(json());
app.use(cookieParser());

export { app };
