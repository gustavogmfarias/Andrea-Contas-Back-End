import { inject, injectable } from "tsyringe";
import { IContasRepository } from "@modules/contas/repositories/IContasRepository";
import { AppError } from "@shared/errors/AppError";
import { Conta } from "@prisma/client";

@injectable()
class FindContaByIdUseCase {
    constructor(
        @inject("ContasRepository")
        private contasRepository: IContasRepository
    ) {}

    async execute(id: string): Promise<Conta> {
        const conta = await this.contasRepository.findById(id);

        if (!conta) {
            throw new AppError("Conta não encontrada", 404);
        }

        return conta;
    }
}
export { FindContaByIdUseCase };
