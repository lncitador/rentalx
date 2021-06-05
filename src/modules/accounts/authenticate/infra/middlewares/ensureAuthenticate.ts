import Auth from "@config/Auth";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "@shared/errors/AppError";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAutheticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token is missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { secret } = Auth.jwt;
    const decoded = verify(token, secret);

    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError("Invalid JWT token", 401);
  }
}
