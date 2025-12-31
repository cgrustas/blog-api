import { generateJWT } from "../utils/token.js";

function createToken(req, res) {
  if (req.user.role !== "ADMIN") {
    return res
      .status(403)
      .json({ message: "Unauthorized - Admin access required" });
  }

  const token = generateJWT(req.user);
  res.json({ token });
}

export default { createToken };
