import { PostModel } from '../db/models/post.js';
import { USER_ROLES } from '../constants/consts.js';
import UserApiError from '../exceptions/userApiError.js';

export const checkIfAllowedDeletePost = async (req, res, next) => {
  const { user: { id, role } } = req;
  const { params: { id: postId } } = req;
  const post = await PostModel.findById(postId);
  const authorId = post.author.toString();
  if (role === USER_ROLES.admin) {
    return next();
  }
  if (id === authorId) {
    return next();
  }
  return next(UserApiError.WithoutPermissons());
};
