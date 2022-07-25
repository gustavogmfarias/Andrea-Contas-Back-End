import { LogRepository } from "@prisma/client";

export interface ILogCreateDTO {
    logRepository: LogRepository;
    descricao: string;
    conteudoAnterior: string;
    conteudoAtualizado: string;
    editadoPorLojistaId: string;
    modelAtualizadoId: string;
}
