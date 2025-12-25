import express, { urlencoded } from "express";
import { join } from "node:path";
import "dotenv/config";
import cors from "cors";

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

/**
 * -------------- ROUTES ----------------
 */

app.get("/", (req, res) => {
  res.send("hello, world");
});

/**
 * -------------- ERROR HANDLING ----------------
 */

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).send(err.message);
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
