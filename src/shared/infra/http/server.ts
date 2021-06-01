import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import AppError from "@shared/errors/AppError";

import "@shared/infra/typeorm";

import { routes } from "./routes";
import swaggerFile from "./swagger.json";

import "express-async-errors";
import "reflect-metadata";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

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
