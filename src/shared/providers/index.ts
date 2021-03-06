import { container } from "tsyringe";

import IStorageProvider from "./models/IStorageProvider";
import { DiskStorageProvider } from "./StorageProvider/DiskStorageProvider";

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  DiskStorageProvider
);
