import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs';
import { PATH_TO_UPLOAD_FILES } from '../constants/consts.js';

class ConvertImageService {
  constructor() {
    this.sharp = sharp;
  }

  convertToWebp = async (file) => {
    const newFileName = `_${file.filename}.webp`;
    await this.sharp(file.path)
      .toFormat('webp')
      .webp({ quality: 50 })
      .toFile(path.resolve(`${PATH_TO_UPLOAD_FILES}${newFileName}`));
    fs.unlinkSync(path.resolve(`${PATH_TO_UPLOAD_FILES}${file.filename}`));
    return newFileName;
  };
}

export default new ConvertImageService();
