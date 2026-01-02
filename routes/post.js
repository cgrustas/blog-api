import { Router } from "express";
import { postController } from "../controllers/index.js";
import passport from "passport";

const router = Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  postController.addPost
);

router.get("/", postController.getPosts);
router.get("/:postId", postController.getPost);

router.patch(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  postController.updatePost
);

router.delete(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  postController.deletePost
);

export default router;
