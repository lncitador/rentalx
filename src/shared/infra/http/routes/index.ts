import { Router } from "express";

import { authenticateUserRouter } from "@modules/accounts/authenticate/infra/routes/authenticateUser.routes";
import { usersRouter } from "@modules/accounts/users/infra/http/routes/users.routes";
import { carImagesRouter } from "@modules/car/carImages/infra/http/routes/carImages.routes";
import { carRouter } from "@modules/car/cars/infra/http/routes/cars.routes";
import { categoriesRouter } from "@modules/car/categories/infra/http/routes/categories.routes";
import { specificationsRouter } from "@modules/car/specifications/infra/http/routes/specifications.routes";

const routes = Router();

routes.use("/categories", categoriesRouter);
routes.use("/specifications", specificationsRouter);
routes.use("/users", usersRouter);
routes.use("/session", authenticateUserRouter);
routes.use("/car", carRouter);
routes.use("/carImages", carImagesRouter);

export { routes };
