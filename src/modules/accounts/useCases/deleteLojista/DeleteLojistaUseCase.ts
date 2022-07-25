import { ILojistasRepository } from "@modules/accounts/repositories/ILojistasRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class DeleteLojistaUseCase {
    constructor(
        @inject("LojistasRepository")
        private lojistasRepository: ILojistasRepository
    ) {}

    async execute(id: string): Promise<void> {
        const lojista = await this.lojistasRepository.findById(id);

        if (!lojista) {
            throw new AppError("Lojista doesn't exists", 404);
        }

        this.lojistasRepository.delete(id);
    }
}

export { DeleteLojistaUseCase };
