import { LogRepository } from "@prisma/client";

export interface ILogCreateDTO {
    logRepository: LogRepository;
    descricao: string;
    conteudoNovo: string;
    conteudoAnterior: string;
    lojistaId: string;
    modelAtualizadoId: string;
}
