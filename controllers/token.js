import { generateJWT } from "../utils/token.js";

function createToken(req, res) {
  const token = generateJWT(req.user);
  res.json({ token });
}

export default { createToken };
