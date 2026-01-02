import { ForbiddenError, NotFoundError } from "../errors/index.js";
import { commentQueries } from "../queries/index.js";

async function addComment(req, res) {
  const authorId = Number(req.user.id);
  const postId = Number(req.params.postId);
  const { content } = req.body;
  const comment = await commentQueries.addComment(content, authorId, postId);

  res.status(201).json(comment);
}

async function getComments(req, res) {
  const postId = Number(req.params.postId);
  const comments = await commentQueries.findCommentsByPostId(postId);

  res.status(200).json({ comments });
}

async function getComment(req, res) {
  const comment = await commentQueries.findCommentById(
    Number(req.params.commentId)
  );
  if (!comment) throw new NotFoundError("Comment not found");

  res.status(200).json({ comment });
}

async function updateComment(req, res) {
  const comment = await commentQueries.findCommentById(
    Number(req.params.commentId)
  );
  if (comment.authorId !== req.user.id && req.user.role !== "ADMIN") {
    throw new ForbiddenError("Not your comment");
  }

  const { content } = req.body;
  const updatedComment = await commentQueries.updateComment(
    Number(req.params.commentId),
    content
  );

  res.status(200).json(updatedComment);
}

async function deleteComment(req, res) {
  const comment = await commentQueries.findCommentById(
    Number(req.params.commentId)
  );
  if (comment.authorId !== req.user.id && req.user.role !== "ADMIN") {
    throw new ForbiddenError("Not your comment");
  }

  await commentQueries.deleteComment(Number(req.params.commentId));
  res.status(204).send();
}

export default {
  addComment,
  getComments,
  getComment,
  updateComment,
  deleteComment,
};
