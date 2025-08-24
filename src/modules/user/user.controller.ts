import type { Request, Response } from "express";
import { UserService } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

// get all users
const getAllUser = catchAsync(async (_req: Request, res: Response) => {
  const data = await UserService.getAllUserFromDB();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Users retrieved successfully",
    data,
  });
});

// update user
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userData = req.body;
  const data = await UserService.updateUserByIdFromDB(id, userData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User updated successfully",
    data,
  });
});

// delete user
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await UserService.deleteByIdFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User deleted successfully",
    data,
  });
});

export const UserController = {
  getAllUser,
  updateUser,
  deleteUser,
};
