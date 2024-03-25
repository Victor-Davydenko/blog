import path from 'node:path';
import fsPromise from 'fs/promises';
import { PATH_TO_UPLOAD_FILES } from '../constants/consts.js';
import convertImageService from '../services/ConvertImageService.js';

export const processPostWithMedia = async (files) => {
  const paths = await Promise.all(files.map(async (file) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      await fsPromise.rename(
        path.resolve(`${PATH_TO_UPLOAD_FILES}${file.filename}`),
        path.resolve(`${PATH_TO_UPLOAD_FILES}${file.filename}${ext}`),
      );
      return file.filename + ext;
    }
    const imagePath = await convertImageService.convertToWebp(file);
    return imagePath;
  }));

  return paths;
};
