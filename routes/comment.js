import { Router } from "express";
import { commentController } from "../controllers/index.js";
import passport from "passport";

const router = Router({ mergeParams: true });

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  commentController.addComment
);

router.get("/", commentController.getComments);
router.get("/:commentId", commentController.getComment);

router.put(
  "/:commentId",
  passport.authenticate("jwt", { session: false }),
  commentController.updateComment
);

router.delete(
  "/:commentId",
  passport.authenticate("jwt", { session: false }),
  commentController.deleteComment
);

export default router;
