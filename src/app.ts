import config from "config";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import userRouter from "./routes/user.routes";

import AppError from "./utils/appError";

// Express MIDDLEWARE
const app = express();

// 1. Body parser
app.use(express.json({ limit: "10kb" }));

// 2. Logger
// TODO: change logger
app.use(morgan("dev"));

// 3. Cookie Parser
app.use(cookieParser());

// 4. Cors
app.use(
  cors({
    origin: config.get<string>("origin"),
    credentials: true,
  })
);

// ROUTES
app.use("/api/users", userRouter);

// UNHANDLED ROUTE
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(404, `Route ${req.originalUrl} not found`));
});

// GLOBAL ERROR HANDLER
app.use((error: AppError, _req: Request, res: Response, next: NextFunction) => {
  error.status = error.status || "error";
  error.statusCode = error.statusCode || 500;

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
  next();
});

export default app;
