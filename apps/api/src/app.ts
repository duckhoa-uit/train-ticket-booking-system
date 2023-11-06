import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express, json, NextFunction, Request, Response } from "express";
import path from "path";

import { env } from "@ttbs/env";

import { indexRouter } from "@/routes/index";

import AppError from "./utils/app-error";

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

// create root Express instance
export const app: Express = express();

// use json decoder for request body
// { strict: false } allows literals to be parsed instead of just objects
app.use(json({ strict: false }));

// Cookie Parser
app.use(cookieParser());

// Cors
app.use(cors());

// Logger
// if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
// initLogger(app)

// include the index router
app.use("/api", indexRouter);

// set static folder - assets
app.use("/assets", express.static(path.join(__dirname, "../assets")));

// root route serving as health check
app.get("/", (_: Request, res: Response) => {
  return res.status(200).send(`${env.NODE_ENV} is running...`);
});

// UNHANDLED ROUTES
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(404, `Route ${req.originalUrl} not found`));
});

// GLOBAL ERROR HANDLER
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});
