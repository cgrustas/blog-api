import { postQueries } from "../queries/index.js";
import { ForbiddenError, NotFoundError } from "../errors/index.js";

async function addPost(req, res) {
  const { title, content, isPublished } = req.body;
  const authorId = Number(req.user.id);
  await postQueries.addPost(title, content, isPublished, authorId);

  res.status(201).json({ message: "New post created" });
}

async function getPosts(req, res) {
  const posts = await postQueries.findPosts();

  res.status(200).json({ posts });
}

async function getPost(req, res) {
  const post = await postQueries.findPostById(Number(req.params.postId));
  if (!post) throw new NotFoundError("Post not found");

  res.status(200).json({ post });
}

async function updatePost(req, res) {
  const post = await postQueries.findPostById(Number(req.params.postId));
  if (!post) throw new NotFoundError("Post not found");
  if (post.authorId !== req.user.id && req.user.role !== "ADMIN") {
    throw new ForbiddenError("Not your post");
  }

  const updatedFields = {};
  const { title, content, isPublished } = req.body;
  if (title) updatedFields.title = title;
  if (content) updatedFields.content = content;
  if (typeof isPublished !== "undefined")
    updatedFields.isPublished = isPublished;

  const updatedPost = await postQueries.updatePost(
    Number(req.params.postId),
    updatedFields
  );

  res.status(200).json({ post: updatedPost });
}

async function deletePost(req, res) {
  const post = await postQueries.findPostById(Number(req.params.postId));
  if (!post) throw new NotFoundError("Post not found");
  if (post.authorId !== req.user.id && req.user.role !== "ADMIN") {
    throw new ForbiddenError("Not your post");
  }

  await postQueries.deletePost(Number(req.params.postId));
  res.status(204).send();
}

export default {
  addPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};
