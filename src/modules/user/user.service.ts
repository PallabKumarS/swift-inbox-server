import httpStatus from "http-status-codes";
import prisma from "../../helpers/prismaClient";
import type { User } from "@prisma/client";

const getAllUserFromDB = async (): Promise<User[] | []> => {
  const result = await prisma.user.findMany();
  return result;
};

const createUserInDB = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data,
  });
  return result;
};

const getUserByIdFromDB = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return result;
};

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
  createUserInDB,
  updateUserByIdFromDB,
  deleteByIdFromDB,
};
