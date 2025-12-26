import { Router } from "express";
import passport from "../lib/passport-local.js";
import { tokenController } from "../controllers/index.js";

const router = Router();

router.post(
  "/",
  passport.authenticate("local", { session: false }),
  tokenController.createToken
);

export default router;
