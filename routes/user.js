import { Router } from "express";
import { userController } from "../controllers/index.js";
import passport from "passport";

const router = Router();

router.post("/", userController.addUser);

router.get("/:userId", userController.getUser);

router.delete(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  userController.deleteUser
);

export default router;
