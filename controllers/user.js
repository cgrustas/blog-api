import { userQueries } from "../queries/index.js";
import { NotFoundError } from "../errors/index.js";

async function addUser(req, res) {
  const { username, password } = req.body;
  await userQueries.addUser(username, password);

  res.status(201).json({ message: "New user created" });
}

async function getUser(req, res) {
  const user = await userQueries.findUserById(Number(req.params.userId));
  if (!user) throw new NotFoundError("User not found");

  res.status(200).json({ user });
}

async function deleteUser(req, res) {
  await userQueries.deleteUser(Number(req.params.userId));

  res.status(204).send();
}

export default {
  addUser,
  getUser,
  deleteUser,
};
