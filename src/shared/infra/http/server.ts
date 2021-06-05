import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import "@shared/infra/typeorm";

import { AppError } from "@shared/errors/AppError";

import { routes } from "./routes";
import swaggerFile from "./swagger.json";

import "reflect-metadata";
import "@shared/container";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(routes);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, _request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

app.get("/", (_request, response) => {
  return response.json({ message: "Ignite" });
});

app.listen(3333, () => console.log("Server Online 🚀"));
