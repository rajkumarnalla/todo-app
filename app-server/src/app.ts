import express, { NextFunction, Request, Response } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

import authRouter from "./routes/auth";
import usersRouter from "./routes/users";
import taskRouter from "./routes/tasks";
import { auth } from "./middleware/auth";

require('dotenv').config();

var app = express();
var options = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204,
  "exposedHeaders": ['Authorization']
}
app.use(cors(options));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// if (process.env.NODE_ENV === 'development') {
app.options("*", cors(options));
app.use(
  cors(options)
);
// }

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/tasks", auth, taskRouter);

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error(err?.stack); // Log the error stack for debugging
  res.status(err?.status || 500); // Set the status code
  res.json({
    error: {
      message: err?.message || "Request Failed",
    },
  }); // Send a JSON response with the error message
});

module.exports = app;
