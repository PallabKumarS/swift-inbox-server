/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import config from "../config";
import type { TErrorSources } from "../errors/error.interface";
import jwt from "jsonwebtoken";
import handleZodError from "../errors/zodError";
import { AppError } from "../errors/appError";
import { errorLogger } from "./logger";

const globalErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  //setting default values
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  // jwt error here
  if (err instanceof jwt.TokenExpiredError) {
    statusCode = 401;
    message = "Token has expired. Please log in again.";
    errorSources = [
      {
        path: "token",
        message: "Token expired",
      },
    ];
  } else if (err instanceof jwt.JsonWebTokenError) {
    statusCode = 401;
    message = "Invalid token. Please log in again.";
    errorSources = [
      {
        path: "token",
        message: "Invalid token",
      },
    ];
  }

  // zod error here
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }

  // custom error here
  else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }

  // default error here
  else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }

  errorLogger.error(message, err);

  //ultimate return
  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.node_env === "development" ? err?.stack : null,
  });
};

export default globalErrorHandler;
