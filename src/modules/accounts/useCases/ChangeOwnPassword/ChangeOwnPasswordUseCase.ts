import { IUpdateLojistaDTO } from "@modules/accounts/dtos/IUpdateLojistaDTO";
import { ILojistasRepository } from "@modules/accounts/repositories/ILojistasRepository";
import { Lojista } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

@injectable()
class ChangeOwnPasswordUseCase {
    constructor(
        @inject("LojistasRepository")
        private lojistasRepository: ILojistasRepository
    ) {}

    async execute({
        id,
        senha,
        senha_antiga,
        confirma_senha,
    }: IUpdateLojistaDTO): Promise<Lojista> {
        const lojista = await this.lojistasRepository.findById(id);
        let passwordHash;

        if (senha_antiga) {
            const passwordMatch = await compare(senha_antiga, lojista.senha);

            if (!passwordMatch) {
                throw new AppError("Last Password doesn't match", 401);
            }
        }

        if (senha === confirma_senha) {
            passwordHash = await hash(senha, 12);
        } else {
            throw new AppError("Passwords don't match", 401);
        }

        this.lojistasRepository.update({
            id,
            senha: passwordHash,
        });

        return lojista;
    }
}

export { ChangeOwnPasswordUseCase };
