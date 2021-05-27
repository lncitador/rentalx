import { Router } from "express";

import { createSpecificationController } from "../controllers";

const specificationsRouter = Router();

specificationsRouter.post("/", (request, response) => {
  return createSpecificationController.handle(request, response);
});

export { specificationsRouter };
