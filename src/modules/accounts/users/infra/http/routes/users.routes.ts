import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/Upload";
import ensureAutheticated from "@modules/accounts/authenticate/infra/middlewares/ensureAuthenticate";

import CreateUserController from "../controllers/CreateUserController";
import { UpdateUserAvatarController } from "../controllers/UpdateUserAvatarController";

const usersRouter = Router();
const upload = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRouter.post("/", createUserController.handle);
usersRouter.patch(
  "/avatar",
  ensureAutheticated,
  upload.single("avatar"),
  updateUserAvatarController.handle
);

export { usersRouter };
