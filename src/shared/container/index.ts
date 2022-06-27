import { container } from "tsyringe";
import "./providers";
import { LojistasRepository } from "@modules/accounts/repositories/infra/LojistasRepository";
import { ILojistasRepository } from "@modules/accounts/repositories/ILojistasRepository";
import { ILojistasTokensRepository } from "@modules/accounts/repositories/ILojistasTokensRepository";
import { LojistasTokensRepository } from "@modules/accounts/repositories/infra/LojistasTokensRepository";

container.registerSingleton<ILojistasRepository>(
    "LojistasRepository",
    LojistasRepository
);

container.registerSingleton<ILojistasTokensRepository>(
    "LojistasTokensRepository",
    LojistasTokensRepository
);
