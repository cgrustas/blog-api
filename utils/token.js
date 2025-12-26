import jwt from "jsonwebtoken";
import { userQueries } from "../queries/index.js";

export function generateJWT(user) {
  const payload = { id: user.id };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
}

export async function verifyToken(payload, done) {
  try {
    const user = await userQueries.findUserById(payload.id);
    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
}
