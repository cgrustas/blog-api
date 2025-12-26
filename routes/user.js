import { Router } from "express";
import { userController } from "../controllers/index.js";

const router = Router();

router.post("/", userController.addUser);

router.get("/:userId", userController.getUser);

router.delete("/:userId", userController.deleteUser);

export default router;
