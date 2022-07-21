import { LogRepository } from "@prisma/client";

export interface ILogCreateDTO {
    logRepository: LogRepository;
    descricao: string;
    conteudoAnterior: string;
    conteudoNovo: string;
    lojistaId: string;
    modelEditadoId?: string;
}
