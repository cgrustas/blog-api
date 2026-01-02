import { prisma } from "../lib/prisma.js";

async function addPost(title, content, isPublished, authorId) {
  return prisma.post.create({
    data: { title, content, isPublished, authorId },
  });
}

async function findPosts() {
  return prisma.post.findMany({
    include: { author: true },
  });
}

async function findPostById(id) {
  return prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
      comments: {
        include: { author: true },
      },
    },
  });
}

async function updatePost(id, updatedFields) {
  return prisma.post.update({
    where: { id },
    data: updatedFields,
    include: { author: true },
  });
}

async function deletePost(id) {
  return prisma.post.delete({
    where: { id },
  });
}

export default {
  addPost,
  findPosts,
  findPostById,
  updatePost,
  deletePost,
};
