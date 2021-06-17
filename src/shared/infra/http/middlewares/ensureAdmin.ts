import { NextFunction, Request, Response } from "express";

import { UsersRepository } from "@modules/accounts/users/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const { id } = request.user;

  const userRepository = new UsersRepository();
  const user = await userRepository.findById(id);
  if (!user.isAdmin) {
    throw new AppError("User ins't admin!");
  }

  return next();
}
