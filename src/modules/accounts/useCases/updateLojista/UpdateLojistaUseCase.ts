import { IUpdateLojistaDTO } from "@modules/accounts/dtos/IUpdateLojistaDTO";
import { ILojistasRepository } from "@modules/accounts/repositories/ILojistasRepository";
import { Lojista } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { injectable, inject } from "tsyringe";

@injectable()
class UpdateLojistaUseCase {
    constructor(
        @inject("LojistasRepository")
        private lojistasRepository: ILojistasRepository
    ) {}

    async execute({
        id,
        nome,
        username,
        senha,
        confirma_senha,
    }: IUpdateLojistaDTO): Promise<Lojista> {
        const lojista = await this.lojistasRepository.findById(id);
        let passwordHash;

        if (!lojista) {
            throw new AppError("Lojista doesn't exist", 404);
        }

        if (username) {
            lojista.username = username;
        }

        if (nome) {
            lojista.nome = nome;
        }

        if (senha === confirma_senha) {
            passwordHash = await hash(senha, 12);
        } else {
            throw new AppError("Passwords don't match", 401);
        }

        this.lojistasRepository.update({
            id,
            nome,
            username,
            senha: passwordHash,
        });

        return lojista;
    }
}

export { UpdateLojistaUseCase };
