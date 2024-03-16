import path from 'node:path';
import ValidationError from '../exceptions/ValidationError.js';

export const imageFileFilter = (req, file, callback) => {
  const ext = path.extname(file.originalname);
  if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
    return callback(ValidationError.NotValidInput('Only images are allowed'));
  }
  return callback(null, true);
};

export const videoFileFilter = (req, file, callback) => {
  const ext = path.extname(file.originalname);
  if (ext !== '.mp4' && ext !== '.mov' && ext !== '.avi' && ext !== '.webm') {
    return callback(ValidationError.NotValidInput('Only images are allowed'));
  }
  return callback(null, true);
};
