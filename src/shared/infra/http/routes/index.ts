import { categoriesRoutes } from "@modules/categories/infra/http/routes/categories.routes";
import { specificationsRouter } from "@modules/specifications/infra/http/routes/specifications.routes";
import { Router } from "express";

const routes = Router();

routes.use("/categories", categoriesRoutes);
routes.use("/specifications", specificationsRouter);

export { routes };
