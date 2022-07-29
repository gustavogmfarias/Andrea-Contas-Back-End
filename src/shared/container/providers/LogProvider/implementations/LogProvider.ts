import { Log } from "@prisma/client";
import { prisma } from "@shared/database/prismaClient";
import { ILogCreateDTO } from "../dtos/ILogCreateDTO";
import { ILogProvider } from "../ILogProvider";

export class LogProvider implements ILogProvider {
    async create({
        logRepository,
        descricao,
        conteudoAnterior,
        conteudoNovo,
        lojistaId,
        modelEditadoId,
    }: ILogCreateDTO): Promise<Log> {
        const logCriado = await prisma.log.create({
            data: {
                logRepository,
                descricao,
                conteudoAnterior,
                conteudoNovo,
                lojistaId,
                modelEditadoId,
            },
        });

        return logCriado;
    }
}
