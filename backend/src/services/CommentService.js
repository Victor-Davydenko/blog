import path from 'node:path';
import fsPromise from 'fs/promises';
import ConvertImageService from './ConvertImageService.js';
import { PATH_TO_UPLOAD_FILES } from '../constants/consts.js';
import CommentDbService from './CommentDbService.js';

class CommentService {
  constructor(commentDbService, convertImageService) {
    this.commentDbService = commentDbService;
    this.convertImageService = convertImageService;
  }

  processPostWithMedia = async (files) => {
    const paths = await Promise.all(files.map(async (file) => {
      const ext = path.extname(file.originalname);
      if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
        await fsPromise.rename(
          path.resolve(`${PATH_TO_UPLOAD_FILES}${file.filename}`),
          path.resolve(`${PATH_TO_UPLOAD_FILES}${file.filename}${ext}`),
        );
        return file.filename + ext;
      }
      const imagePath = await this.convertImageService.convertToWebp(file);
      return imagePath;
    }));

    return paths;
  };

  commentPost = async (comment, files, postId, userId) => {
    if (files) {
      const paths = await this.processPostWithMedia(files);
      const commentWithMedia = { ...comment, media: paths };
      const newComment = await this.commentDbService.comment(commentWithMedia, postId, userId);
      return newComment;
    }
    const newComment = await this.commentDbService.comment(comment, postId, userId);
    return newComment;
  };

  getComment = async (id) => {
    const comment = await this.commentDbService.getComment(id);
    return comment;
  };

  deleteComment = async (id) => {
    await this.commentDbService.deleteComment(id);
  };
}

export default new CommentService(CommentDbService, ConvertImageService);
