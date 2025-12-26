import { Router } from "express";
import { commentController } from "../controllers/index.js";

const router = Router({ mergeParams: true });

router.post("/", commentController.addComment);

router.get("/", commentController.getComments);
router.get("/:commentId", commentController.getComment);

router.put("/:commentId", commentController.updateComment);

router.delete("/:commentId", commentController.deleteComment);

export default router;
