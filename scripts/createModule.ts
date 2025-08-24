import fs from "node:fs";
import path from "node:path";

// Function to create a module with dynamic files
const createModule = (moduleName: string): void => {
  const baseDir = path.join(__dirname, "../", "src/", "modules", moduleName);
  const testDir = path.join(__dirname, "../", "src/", "tests", moduleName);

  // List of files to be created
  const files = [
    `${moduleName}.routes.ts`,
    `${moduleName}.controller.ts`,
    `${moduleName}.service.ts`,
    `${moduleName}.validation.ts`,
  ];

  const testFile = `${moduleName}.test.ts`;

  // Create the module directory
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
    console.log(`Directory created: ${baseDir}`);
  } else {
    console.log(`Directory already exists: ${baseDir}`);
  }

  // Create the tests directory
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
    console.log(`Directory created: ${testDir}`);
  } else {
    console.log(`Directory already exists: ${testDir}`);
  }

  // Create each file with basic content
  files.forEach((file) => {
    const filePath = path.join(baseDir, file);
    if (!fs.existsSync(filePath)) {
      let content = "";

      // route
      if (file.endsWith(".routes.ts")) {
        content = `import { Router } from "express";
import { ${capitalize(
          moduleName
        )}Controller } from "./${moduleName}.controller";

const router = Router();

// Define routes
router.get("/", ${capitalize(moduleName)}Controller.getAll${capitalize(
          moduleName
        )});

export const ${capitalize(moduleName)}Routes = router;`;

        // controller
      } else if (file.endsWith(".controller.ts")) {
        content = `import { Request, Response } from "express";
import { ${capitalize(moduleName)}Service } from "./${moduleName}.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';

const getAll${capitalize(
          moduleName
        )} = catchAsync(async (req: Request, res: Response) => {
  const data = await ${capitalize(moduleName)}Service.getAll${capitalize(
          moduleName
        )}FromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "${capitalize(moduleName)}s retrieved successfully",
    data,
  });
});

export const ${capitalize(moduleName)}Controller = { getAll${capitalize(
          moduleName
        )} };`;

        // validation here
      } else if (file.endsWith(".validation.ts")) {
        content = `import { z } from "zod";

const create${capitalize(moduleName)}Validation = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
  }),
});

const update${capitalize(moduleName)}Validation = create${capitalize(
          moduleName
        )}Validation.partial();

export const ${capitalize(moduleName)}Validation = {
  create${capitalize(moduleName)}Validation,
  update${capitalize(moduleName)}Validation,
};`;

        // service
      } else if (file.endsWith(".service.ts")) {
        content = `
        /* eslint-disable @typescript-eslint/no-explicit-any */
        import prisma from '../../helpers/prismaClient';
        import httpStatus from 'http-status-codes';

const getAll${capitalize(moduleName)}FromDB = async ():Promise<any> => {
  const result = await prisma.${moduleName}.findMany();
  return result;
};

export const ${capitalize(moduleName)}Service = { getAll${capitalize(
          moduleName
        )}FromDB };`;
      }

      fs.writeFileSync(filePath, content, "utf-8");
      console.log(`File created: ${filePath}`);
    } else {
      console.log(`File already exists: ${filePath}`);
    }
  });
};

// Utility function to capitalize the module name
const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

// Get the module name from command-line arguments
const moduleName = process.argv[2];
if (!moduleName) {
  console.error("Please provide a module name.");
  process.exit(1);
}

// Execute the function
createModule(moduleName);
