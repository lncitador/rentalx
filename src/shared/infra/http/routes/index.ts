import { usersRouter } from "@modules/accounts/users/infra/http/routes/users.routes";
import { categoriesRouter } from "@modules/cars/categories/infra/http/routes/categories.routes";
import { specificationsRouter } from "@modules/cars/specifications/infra/http/routes/specifications.routes";
import { Router } from "express";

const routes = Router();

routes.use("/categories", categoriesRouter);
routes.use("/specifications", specificationsRouter);
routes.use("/users", usersRouter);

export { routes };
