import { Router } from "express";
import passport from "../lib/passport-local.js";
import { tokenController } from "../controllers/index.js";

const router = Router();

router.post(
  "/",
  (req, res, next) => {
    const authMiddleware = passport.authenticate(
      "local",
      { session: false },
      (err, user, info) => {
        if (err) return next(err);
        if (!user) {
          return res
            .status(401)
            .json({ message: info.message || "Login failed" });
        }
        req.user = user;
        next();
      }
    );
    authMiddleware(req, res, next);
  },
  tokenController.createToken
);

export default router;
