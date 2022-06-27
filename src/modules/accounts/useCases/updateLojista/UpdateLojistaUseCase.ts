import { IUpdateLojistaDTO } from "@modules/accounts/dtos/IUpdateLojistaDTO";
import { ILojistasRepository } from "@modules/accounts/repositories/ILojistasRepository";
import { Lojista } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import { injectable, inject } from "tsyringe";

@injectable()
class UpdateLojistaUseCase {
    constructor(
        @inject("LojistasRepository")
        private lojistasRepository: ILojistasRepository
    ) {}

    async execute({
        id,
        username,
        password,
        old_password,
        confirm_password,
    }: IUpdateLojistaDTO): Promise<Lojista> {
        const lojista = await this.lojistasRepository.findById(id);
        let passwordHash;

        if (!lojista) {
            throw new AppError("Lojista doesn't exist", 404);
        }

        if (username) {
            lojista.username = username;
        }

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
            username,
            password: passwordHash,
        });

        return lojista;
    }
}

export { UpdateLojistaUseCase };
