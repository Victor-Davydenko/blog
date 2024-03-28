import winston, { format } from 'winston';
import path from 'node:path';

const { dirname } = import.meta;

export const logger = winston.createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.json(),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(dirname, '..', '..', 'logs/combined.log') }),
  ],
});
