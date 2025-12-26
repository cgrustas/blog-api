import express, { urlencoded } from "express";
import "dotenv/config";
import cors from "cors";
import {
  tokenRouter,
  userRouter,
  postRouter,
  commentRouter,
} from "./routes/index.js";

/**
 * -------------- GENERAL SETUP ----------------
 */

const app = express();

app.use(express.json());
app.use(cors());
app.use(urlencoded({ extended: true }));

/**
 * -------------- JWT SETUP ----------------
 */

/**
 * -------------- PASSPORT JWT AUTHENTICATION ----------------
 *
 */
import "./lib/passport-jwt.js";

/**
 * -------------- ROUTES ----------------
 */

app.use("/tokens", tokenRouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/posts/:postId/comments", commentRouter);

/**
 * -------------- ERROR HANDLING ----------------
 */
const prismaErrorMap = {
  P2025: { statusCode: 404, message: "Resource not found" },
};

app.use((err, req, res, next) => {
  console.error(err);

  const prismaError = prismaErrorMap[err.code];
  if (prismaError) {
    res.status(prismaError.statusCode).json(prismaError.message);
  } else {
    res.status(err.statusCode || 500).json(err.message);
  }
});

/**
 * -------------- SERVER ----------------
 */

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express app listening on port ${PORT}!`);
});
