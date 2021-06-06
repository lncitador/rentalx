import { container } from "tsyringe";

import { BcryptHashProvider } from "./HashProvider/BCryptHashProvider";
import IHashProvider from "./models/IHashProvider";

container.registerSingleton<IHashProvider>("HashProvider", BcryptHashProvider);
