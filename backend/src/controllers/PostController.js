import PostService from '../services/PostService.js';

class PostController {
  constructor(postService) {
    this.postService = postService;
  }

  createPost = async (req, res, next) => {
    try {
      const { body: post, user: { id }, files } = req;
      const newPost = await this.postService.createPost(post, files, id);
      res.status(201).json({
        status: 201,
        message: 'Post has been successfully created',
        post: newPost,
      });
    } catch (e) {
      next();
    }
  };

  commentPost = async (req, res, next) => {
    try {
      const { body: comment, user: { id: userId }, files } = req;
      const { params: { id } } = req;
      console.log({
        comment, files, id, userId,
      });
      const newPost = await this.postService.commentPost(comment, files, id, userId);
      res.status(201).json({
        status: 201,
        message: 'Comment has been successfully created',
        post: newPost,
      });
    } catch (e) {
      next();
    }
  };
}

export default new PostController(PostService);
