import { ILojistaResponseDTO } from "@modules/accounts/dtos/ILojistaResponseDTO";
import { IUpdateLojistaDTO } from "@modules/accounts/dtos/IUpdateLojistaDTO";
import { LojistaMap } from "@modules/accounts/mapper/LojistaMap";
import { ILojistasRepository } from "@modules/accounts/repositories/ILojistasRepository";
import { Log, Lojista } from "@prisma/client";
import { ILogProvider } from "@shared/container/providers/LogProvider/ILogProvider";
import { AppError } from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

@injectable()
class ChangeOwnPasswordUseCase {
    constructor(
        @inject("LojistasRepository")
        private lojistasRepository: ILojistasRepository,
        @inject("LogProvider") private logProvider: ILogProvider
    ) {}

    async execute({
        id,
        senha,
        senha_antiga,
        confirma_senha,
        editadoEm,
    }: IUpdateLojistaDTO): Promise<(ILojistaResponseDTO | Log)[]> {
        const lojistaAnterior = await this.lojistasRepository.findById(id);
        let passwordHash;

        if (senha_antiga) {
            const passwordMatch = await compare(
                senha_antiga,
                lojistaAnterior.senha
            );

            if (!passwordMatch) {
                throw new AppError("Last Password doesn't match", 401);
            }
        }

        if (senha === confirma_senha) {
            passwordHash = await hash(senha, 12);
        } else {
            throw new AppError("Passwords don't match", 401);
        }

        const lojistaAlterado = await this.lojistasRepository.update({
            id,
            senha: passwordHash,
            editadoEm,
        });

        const lojistaDTO = LojistaMap.toDTO(lojistaAlterado);

        const log = await this.logProvider.create({
            logRepository: "LOJISTA",
            descricao: `Senha do Lojista atualizado`,
            conteudoAnterior: JSON.stringify(LojistaMap.toDTO(lojistaAnterior)),
            conteudoNovo: JSON.stringify(LojistaMap.toDTO(lojistaAlterado)),
            lojistaId: id,
            modelAtualizadoId: id,
        });

        return [lojistaDTO, log];
    }
}

export { ChangeOwnPasswordUseCase };
