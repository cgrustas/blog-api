import { prisma } from "../lib/prisma.js";

async function addComment(content, authorId, postId) {
  return prisma.comment.create({
    data: { content, authorId, postId },
  });
}

async function findCommentsByPostId(postId) {
  return prisma.comment.findMany({
    where: { postId },
  });
}

async function findCommentById(id) {
  return prisma.comment.findUnique({
    where: { id },
  });
}

async function updateComment(id, content) {
  return prisma.comment.update({
    where: { id },
    data: { content },
  });
}

async function deleteComment(id) {
  return prisma.comment.delete({
    where: { id },
  });
}

export default {
  addComment,
  findCommentsByPostId,
  findCommentById,
  updateComment,
  deleteComment,
};
