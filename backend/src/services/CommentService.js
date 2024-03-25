import ConvertImageService from './ConvertImageService.js';
import CommentDbService from './CommentDbService.js';
import { processPostWithMedia } from '../utils/proccessFiles.js';

class CommentService {
  constructor(commentDbService, convertImageService) {
    this.commentDbService = commentDbService;
    this.convertImageService = convertImageService;
  }

  commentPost = async (comment, files, postId, userId) => {
    const tags = comment.text.match(/#[^\s#]*/g);
    if (files) {
      const paths = await processPostWithMedia(files);
      const commentWithMedia = { ...comment, media: paths, tags };
      const newComment = await this.commentDbService.comment(commentWithMedia, postId, userId);
      return newComment;
    }
    const commentWithTags = { ...comment, tags };
    const newComment = await this.commentDbService.comment(commentWithTags, postId, userId);
    return newComment;
  };

  getComment = async (id, userId) => {
    if (userId) {
      this.addView(id, userId);
    }
    const comment = await this.commentDbService.getComment(id);
    return comment;
  };

  deleteComment = async (id) => {
    await this.commentDbService.deleteComment(id);
  };

  likeComment = async (commentId, userId) => {
    const comment = await this.commentDbService.getComment(commentId);
    const isLiked = comment.likes.find((el) => userId === el.toString());
    if (!isLiked) {
      await this.commentDbService.likeComment(commentId, userId);
    } else {
      await this.commentDbService.unlikeComment(commentId, userId);
    }
  };

  addView = async (commentId, userId) => {
    const comment = await this.commentDbService.getComment(commentId);
    const isViewedByUser = comment.views.find((el) => userId === el.toString());
    if (!isViewedByUser) {
      await this.commentDbService.addView(commentId, userId);
    }
  };
}

export default new CommentService(CommentDbService, ConvertImageService);
