import { Lojista } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { LojistaMap } from "@modules/accounts/mapper/LojistaMap";
import { ILojistaResponseDTO } from "@modules/accounts/dtos/ILojistaResponseDTO";
import { ICreateLojistaDTO } from "../../dtos/ICreateLojistaDTO";
import { ILojistasRepository } from "../../repositories/ILojistasRepository";

@injectable()
class CreateLojistaUseCase {
    constructor(
        @inject("LojistasRepository")
        private lojistasRepository: ILojistasRepository
    ) {}

    async execute({
        username,
        senha,
        nome,
    }: ICreateLojistaDTO): Promise<ILojistaResponseDTO> {
        const lojistaAlreadyExists =
            await this.lojistasRepository.findByUserName(username);

        if (lojistaAlreadyExists) {
            throw new AppError("Lojista already exists");
        }

        const passwordHash = await hash(senha, 12);

        const lojista = await this.lojistasRepository.create({
            username,
            senha: passwordHash,
            nome,
        });

        const lojistaDTO = LojistaMap.toDTO(lojista);

        return lojistaDTO;
    }
}

export { CreateLojistaUseCase };
