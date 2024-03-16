import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs';

class ConvertImageService {
  constructor() {
    this.sharp = sharp;
  }

  convertToWebp = async (file) => {
    const newFileName = `_${file.filename}`;
    await this.sharp(file.path)
      .toFormat('webp')
      .webp({ quality: 10 })
      .toFile(path.resolve(`public/uploads/${newFileName}.webp`));
    fs.unlinkSync(path.resolve(`public/uploads/${file.filename}`));
    return newFileName;
  };
}

export default new ConvertImageService();
