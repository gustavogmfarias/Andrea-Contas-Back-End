import { container } from "tsyringe";
import { LogProvider } from "./implementations/LogProvider";
import { ILogProvider } from "./ILogProvider";

container.registerSingleton<ILogProvider>("LogProvider", LogProvider);
