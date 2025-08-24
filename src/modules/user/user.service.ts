import prisma from "../../helpers/prismaClient";
import type { User } from "@prisma/client";

// get all users
const getAllUserFromDB = async (): Promise<User[] | []> => {
  const result = await prisma.user.findMany();
  return result;
};

// get user by id
const getUserByIdFromDB = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return result;
};

// update user by id
const updateUserByIdFromDB = async (
  id: string,
  data: Partial<User>
): Promise<User> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

// delete user by id
const deleteByIdFromDB = async (id: string): Promise<User> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};

export const UserService = {
  getAllUserFromDB,
  getUserByIdFromDB,
  updateUserByIdFromDB,
  deleteByIdFromDB,
};
