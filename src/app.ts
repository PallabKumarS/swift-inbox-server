import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config";
import { rootRoute } from "./root.route";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";

const app: Application = express();

// parsers
app.use(
  cors({
    origin: [config.local_client as string, config.client as string].filter(
      Boolean
    ),
    credentials: true,
  })
);

// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.path}`);
//   console.log('Query params:', req.query);
//   console.log('Body:', req.body);
//   console.log('Headers:', req.headers);
//   console.log('---');
//   next();
// });

app.use(cookieParser());
app.use(express.json());

// all routes here
app.use("/api", rootRoute);

app.get("/", (_req: Request, res: Response) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Server Status</title>
      <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f4f4f4;
          font-family: Arial, sans-serif;
        }
        h1 {
          text-align: center;
          color: #333;
        }
      </style>
    </head>
    <body>
      <h1>🚀 Server is running successfully! 🚀</h1>
    </body>
    </html>
  `);
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
