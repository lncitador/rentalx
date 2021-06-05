import { container } from "tsyringe";

import IHashProvider from "../model/IHashProvider";
import { BcryptHashProvider } from "./HashProvider/BCryptHashProvider";

container.registerSingleton<IHashProvider>("HashProvider", BcryptHashProvider);
