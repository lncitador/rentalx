import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/Upload";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import ensureAutheticated from "@shared/infra/http/middlewares/ensureAuthenticate";

import { UploadCarImagesController } from "../controllers/UploadCarImagesController";

const uploadCarImagesController = new UploadCarImagesController();

const carImagesRouter = Router();

const upload = multer(uploadConfig);

carImagesRouter.post(
  "/:id",
  ensureAutheticated,
  ensureAdmin,
  upload.array("images"),
  uploadCarImagesController.handle
);

export { carImagesRouter };
