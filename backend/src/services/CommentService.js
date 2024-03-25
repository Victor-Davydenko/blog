import ConvertImageService from './ConvertImageService.js';
import CommentDbService from './CommentDbService.js';
import { processPostWithMedia } from '../utils/proccessFiles.js';

class CommentService {
  constructor(commentDbService, convertImageService) {
    this.commentDbService = commentDbService;
    this.convertImageService = convertImageService;
  }

  commentPost = async (comment, files, postId, userId) => {
    if (files) {
      const paths = await processPostWithMedia(files);
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
