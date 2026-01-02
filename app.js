import express, { urlencoded } from "express";
import "dotenv/config";
import cors from "cors";
import {
  tokenRouter,
  userRouter,
  postRouter,
  commentRouter,
} from "./routes/index.js";
import "./lib/passport-jwt.js";

/**
 * -------------- GENERAL SETUP ----------------
 */

const app = express();

const allowedOrigins = [
  "http://localhost:5173", // blog-admin dev
  "http://localhost:5174", // blog-client dev
  process.env.ADMIN_URL,
  process.env.CLIENT_URL,
].filter(Boolean);

console.log("CORS allowed origins:", allowedOrigins);

app.use(express.json());
app.use(cors({ origin: allowedOrigins }));
app.use(urlencoded({ extended: true }));

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
