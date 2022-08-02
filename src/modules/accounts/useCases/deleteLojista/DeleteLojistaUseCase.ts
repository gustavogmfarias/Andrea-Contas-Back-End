import { ILojistaResponseDTO } from "@modules/accounts/dtos/ILojistaResponseDTO";
import { LojistaMap } from "@modules/accounts/mapper/LojistaMap";
import { ILojistasRepository } from "@modules/accounts/repositories/ILojistasRepository";
import { Log, Lojista } from "@prisma/client";
import { ILogProvider } from "@shared/container/providers/LogProvider/ILogProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class DeleteLojistaUseCase {
    constructor(
        @inject("LojistasRepository")
        private lojistasRepository: ILojistasRepository,
        @inject("LogProvider") private logProvider: ILogProvider
    ) {}

    async execute(
        lojistaId: string,
        id: string
    ): Promise<(ILojistaResponseDTO | Log)[]> {
        const lojistaDeletado = await this.lojistasRepository.findById(id);

        if (!lojistaDeletado) {
            throw new AppError("Lojista doesn't exists", 404);
        }

        const lojistaDTO = LojistaMap.toDTO(lojistaDeletado);

        await this.lojistasRepository.delete(id);

        const log = await this.logProvider.create({
            logRepository: "LOJISTA",
            descricao: `Lojista deletado com Sucesso!`,
            conteudoAnterior: JSON.stringify(lojistaDTO),
            conteudoNovo: JSON.stringify(lojistaDTO),
            lojistaId,
            modelAtualizadoId: lojistaDeletado.id,
        });

        return [lojistaDTO, log];
    }
}

export { DeleteLojistaUseCase };
