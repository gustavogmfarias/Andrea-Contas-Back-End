import { ILojistaResponseDTO } from "@modules/accounts/dtos/ILojistaResponseDTO";
import { IUpdateLojistaDTO } from "@modules/accounts/dtos/IUpdateLojistaDTO";
import { LojistaMap } from "@modules/accounts/mapper/LojistaMap";
import { ILojistasRepository } from "@modules/accounts/repositories/ILojistasRepository";
import { Log, Lojista } from "@prisma/client";
import { ILogProvider } from "@shared/container/providers/LogProvider/ILogProvider";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { injectable, inject } from "tsyringe";

@injectable()
class UpdateLojistaUseCase {
    constructor(
        @inject("LojistasRepository")
        private lojistasRepository: ILojistasRepository,
        @inject("LogProvider") private logProvider: ILogProvider
    ) {}

    async execute(
        lojistaId: string,
        {
            editadoEm,
            id,
            nome,
            username,
            senha,
            confirmaSenha,
        }: IUpdateLojistaDTO
    ): Promise<(ILojistaResponseDTO | Log)[]> {
        const lojistaBuscado = await this.lojistasRepository.findById(id);
        let passwordHash;

        if (!lojistaBuscado) {
            throw new AppError("Lojista doesn't exist", 404);
        }

        if (senha && confirmaSenha) {
            if (senha === confirmaSenha) {
                passwordHash = await hash(senha, 12);
            } else {
                throw new AppError("Passwords don't match", 401);
            }
        }

        const lojistaAtualizado = await this.lojistasRepository.update({
            id,
            nome,
            username,
            senha: passwordHash,
            editadoEm,
        });

        const lojistaBuscadoDTO = LojistaMap.toDTO(lojistaBuscado);
        const lojistaAtualizadoDTO = LojistaMap.toDTO(lojistaAtualizado);

        const log = await this.logProvider.create({
            logRepository: "LOJISTA",
            descricao: "Lojista atualizado com Sucesso!",
            conteudoAnterior: JSON.stringify(lojistaBuscadoDTO),
            conteudoNovo: JSON.stringify(lojistaAtualizadoDTO),
            lojistaId,
            modelAtualizadoId: lojistaBuscado.id,
        });

        return [lojistaAtualizadoDTO, log];
    }
}

export { UpdateLojistaUseCase };
