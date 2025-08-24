
        /* eslint-disable @typescript-eslint/no-explicit-any */
        import prisma from '@prisma/client';
        import httpStatus from 'http-status';

const getAllUserFromDB = async ():Promise<any> => {
  const result = await prisma.user.findMany();
  return result;
};

export const UserService = { getAllUserFromDB };