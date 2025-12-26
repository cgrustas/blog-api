import { Router } from "express";
import { postController } from "../controllers/index.js";

const router = Router();

router.post("/", postController.addPost);

router.get("/", postController.getPosts);
router.get("/:postId", postController.getPost);

router.put("/:postId", postController.updatePost);

router.delete("/:postId", postController.deletePost);

export default router;
