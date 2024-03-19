import multer from 'multer';
import { v4 } from 'uuid';
import { MAX_FILE_SIZE_TO_UPLOAD, PATH_TO_UPLOAD_FILES } from '../constants/consts.js';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `${PATH_TO_UPLOAD_FILES}`);
  },
  filename(req, file, cb) {
    const fileName = v4();
    cb(null, `${fileName}`);
  },
});

export const uploadMedia = (fileFilterCallBack) => multer({
  storage,
  fileFilter: fileFilterCallBack,
  limits: {
    fileSize: MAX_FILE_SIZE_TO_UPLOAD,
  },
});
