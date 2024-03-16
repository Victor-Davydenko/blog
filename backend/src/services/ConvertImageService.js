import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs';

class ConvertImageService {
  constructor() {
    this.sharp = sharp;
  }

  convertToWebp = async (file) => {
    const newFileName = `_${file.filename}.webp`;
    await this.sharp(file.path)
      .toFormat('webp')
      .webp({ quality: 50 })
      .toFile(path.resolve(`public/uploads/${newFileName}`));
    fs.unlinkSync(path.resolve(`public/uploads/${file.filename}`));
    return newFileName;
  };
}

export default new ConvertImageService();
