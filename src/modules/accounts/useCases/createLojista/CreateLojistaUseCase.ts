import { Log, Lojista } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { LojistaMap } from "@modules/accounts/mapper/LojistaMap";
import { ILojistaResponseDTO } from "@modules/accounts/dtos/ILojistaResponseDTO";
import { ILogProvider } from "@shared/container/providers/LogProvider/ILogProvider";
import { ICreateLojistaDTO } from "../../dtos/ICreateLojistaDTO";
import { ILojistasRepository } from "../../repositories/ILojistasRepository";

@injectable()
class CreateLojistaUseCase {
    constructor(
        @inject("LojistasRepository")
        private lojistasRepository: ILojistasRepository,
        @inject("LogProvider") private logProvider: ILogProvider
    ) {}

    async execute(
        lojistaId: string,
        { username, senha, nome }: ICreateLojistaDTO
    ): Promise<(ILojistaResponseDTO | Log)[]> {
        const lojistaAlreadyExists =
            await this.lojistasRepository.findByUserName(username);

        if (lojistaAlreadyExists) {
            throw new AppError("Lojista already exists");
        }

        const passwordHash = await hash(senha, 12);

        const novoLojista = await this.lojistasRepository.create({
            username,
            senha: passwordHash,
            nome,
        });

        const lojistaDTO = LojistaMap.toDTO(novoLojista);

        const log = await this.logProvider.create({
            logRepository: "LOJISTA",
            descricao: `Lojista Criado com Sucesso!`,
            conteudoAnterior: JSON.stringify(lojistaDTO),
            conteudoNovo: JSON.stringify(lojistaDTO),
            lojistaId,
            modelAtualizadoId: novoLojista.id,
        });

        return [lojistaDTO, log];
    }
}

export { CreateLojistaUseCase };
