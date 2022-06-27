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
        password,
        old_password,
        confirm_password,
    }: IUpdateLojistaDTO): Promise<Lojista> {
        const lojista = await this.lojistasRepository.findById(id);
        let passwordHash;

        if (old_password) {
            const passwordMatch = await compare(old_password, lojista.password);

            if (!passwordMatch) {
                throw new AppError("Last Password doesn't match", 401);
            }
        }

        if (password === confirm_password) {
            passwordHash = await hash(password, 12);
        } else {
            throw new AppError("Passwords don't match", 401);
        }

        this.lojistasRepository.update({
            id,
            password: passwordHash,
        });

        return lojista;
    }
}

export { ChangeOwnPasswordUseCase };
