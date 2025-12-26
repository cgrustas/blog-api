import { userQueries } from "../queries/index.js";
import { ForbiddenError, NotFoundError } from "../errors/index.js";
import bcrypt from "bcryptjs";
import { generateJWT } from "../utils/token.js";

async function addUser(req, res) {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userQueries.addUser(username, hashedPassword);
  const token = generateJWT(user);

  res.status(201).json({ token });
}

async function getUser(req, res) {
  const user = await userQueries.findUserById(Number(req.params.userId));
  if (!user) throw new NotFoundError("User not found");

  res.status(200).json({ user });
}

async function deleteUser(req, res) {
  const user = await userQueries.findUserById(Number(req.params.userId));
  if (user.id !== req.user.id) {
    throw new ForbiddenError("Not your user");
  }

  await userQueries.deleteUser(Number(req.params.userId));

  res.status(204).send();
}

export default {
  addUser,
  getUser,
  deleteUser,
};
