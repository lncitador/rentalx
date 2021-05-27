import express, { NextFunction, Request, Response } from "express";

import AppError from "@shared/errors/AppError";

import { routes } from "./routes";

import "express-async-errors";

const app = express();

app.use(express.json());
app.use(routes);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.get("/", (request, response) => {
  return response.json({ message: "Ignite" });
});

app.listen(3333, () => console.log("Server Online 🚀"));
