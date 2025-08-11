import type { z, ZodError } from "zod";
import type { TErrorSources, TGenericErrorResponse } from "./error.interface";

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSources = err.issues.map(
    (issue: z.core.$ZodIssue) => {
      const path = issue?.path[issue.path.length - 1];
      return {
        path:
          typeof path === "string" || typeof path === "number"
            ? path
            : String(path),
        message: issue.message,
      };
    }
  );

  const statusCode = 400;

  return {
    statusCode,
    message: errorSources.map((error) => error.message).join(", "),
    errorSources,
  };
};

export default handleZodError;
