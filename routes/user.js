import { Router } from "express";
import { userController } from "../controllers/index.js";
import passport from "passport";

const router = Router();

// blog-client: GET: "/",
router.post("/", userController.addUser);

router.get("/:userId", userController.getUser);

// blog-client/admin: GET: '/' -> Account Details link -> GET: users/:userId -> Delete Account form-button -> POST: users/:userId/delete
router.delete(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  userController.deleteUser
);

export default router;
