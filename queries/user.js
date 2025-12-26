import { prisma } from "../lib/prisma.js";

async function addUser(username, password) {
  return prisma.user.create({
    data: { username, password },
  });
}

async function findUserById(id) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

async function deleteUser(id) {
  return prisma.user.delete({
    where: {
      id,
    },
  });
}

export default {
  addUser,
  findUserById,
  deleteUser,
};
