import { container } from "tsyringe";
import "./providers";
import { LojistasRepository } from "@modules/accounts/repositories/infra/LojistasRepository";
import { ILojistasRepository } from "@modules/accounts/repositories/ILojistasRepository";
import { IClientesRepository } from "@modules/clientes/repositories/IClientesRepository";
import { ClientesRepository } from "@modules/clientes/repositories/infra/ClientesRepository";
import { ILojistasTokensRepository } from "@modules/accounts/repositories/ILojistasTokensRepository";
import { LojistasTokensRepository } from "@modules/accounts/repositories/infra/LojistasTokensRepository";
import { IContasRepository } from "@modules/contas/repositories/IContasRepository";
import { ContasRepository } from "@modules/contas/repositories/infra/ContasRepository";

container.registerSingleton<ILojistasRepository>(
    "LojistasRepository",
    LojistasRepository
);

container.registerSingleton<ILojistasTokensRepository>(
    "LojistasTokensRepository",
    LojistasTokensRepository
);

container.registerSingleton<IClientesRepository>(
    "ClientesRepository",
    ClientesRepository
);

container.registerSingleton<IContasRepository>(
    "ContasRepository",
    ContasRepository
);
