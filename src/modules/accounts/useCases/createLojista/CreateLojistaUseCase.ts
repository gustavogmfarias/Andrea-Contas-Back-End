import { AppError } from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { ICreateLojistaDTO } from "../../dtos/ICreateLojistaDTO";
import { ILojistasRepository } from "../../repositories/ILojistasRepository";

@injectable()
class CreateLojistaUseCase {
    constructor(
        @inject("LojistasRepository")
        private lojistasRepository: ILojistasRepository
    ) {}

    async execute({ username, password }: ICreateLojistaDTO): Promise<void> {
        const lojistaAlreadyExists =
            await this.lojistasRepository.findByUserName(username);

        if (lojistaAlreadyExists) {
            throw new AppError("Lojista already exists");
        }

        const passwordHash = await hash(password, 12);

        await this.lojistasRepository.create({
            username,
            password: passwordHash,
        });
    }
}

export { CreateLojistaUseCase };
