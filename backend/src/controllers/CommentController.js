import CommentService from '../services/CommentService.js';

class CommentController {
  constructor(commentService) {
    this.commentService = commentService;
  }

  commentPost = async (req, res, next) => {
    try {
      const { body: comment, user: { id: userId }, files } = req;
      const { params: { id } } = req;
      const newPost = await this.commentService.commentPost(comment, files, id, userId);
      res.status(201).json({
        status: 201,
        message: 'Comment has been successfully created',
        post: newPost,
      });
    } catch (e) {
      next(e);
    }
  };

  getComment = async (req, res, next) => {
    try {
      const { params: { id } } = req;
      const userId = req?.cookies?.id;
      const comment = await this.commentService.getComment(id, userId);
      res.json({
        status: 200,
        message: 'Ok',
        comment,
      });
    } catch (e) {
      next(e);
    }
  };

  deleteComment = async (req, res, next) => {
    try {
      const { params: { id } } = req;
      await this.commentService.deleteComment(id);
      res.status(204).json();
    } catch (e) {
      next(e);
    }
  };

  likeComment = async (req, res, next) => {
    try {
      const { user: { id: userId } } = req;
      const { commentId } = req.body;
      await this.commentService.likeComment(commentId, userId);
      res.status(204).json();
    } catch (e) {
      next(e);
    }
  };
}

export default new CommentController(CommentService);
