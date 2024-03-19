import multer from 'multer';
import { v4 } from 'uuid';
import path from 'node:path';
import fs from 'node:fs';
import { MAX_FILE_SIZE_TO_UPLOAD, PATH_TO_UPLOAD_FILES } from '../constants/consts.js';
import ValidationError from '../exceptions/ValidationError.js';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `${PATH_TO_UPLOAD_FILES}`);
  },
  filename(req, file, cb) {
    const fileName = v4();
    cb(null, `${fileName}`);
  },
});

export const uploadMedia = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE_TO_UPLOAD,
  },
});

export const uploadMiddleware = (uploadSettings) => (req, res, next) => {
  uploadMedia.array(uploadSettings.fieldName, uploadSettings.maxCount)(req, res, (err) => {
    if (err) {
      return next(ValidationError.NotValidInput('Something with file uploading went wrong, try again'));
    }
    const { files } = req;
    const errors = [];
    files.forEach((file) => {
      const ext = path.extname(file.originalname);
      if (!uploadSettings.allowedExtensions.includes(ext)) {
        errors.push(`Invalid file type: ${file.originalname}`);
      }
    });
    if (errors.length > 0) {
      files.forEach((file) => {
        fs.unlinkSync(file.path);
      });

      return next(ValidationError.NotValidInput('Something with file uploading went wrong, try again'));
    }
    req.files = files;
    next();
  });
};
