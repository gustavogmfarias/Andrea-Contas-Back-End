import { IClientesRepository } from "@modules/clientes/repositories/IClientesRepository";
import { AppError } from "@shared/errors/AppError";
import { injectable, inject } from "tsyringe";

@injectable()
class DeleteClienteUseCase {
    constructor(
        @inject("ClientesRepository")
        private clientesRepository: IClientesRepository
    ) {}

    async execute(cpf: string): Promise<void> {
        try {
            await this.clientesRepository.delete(cpf);
        } catch (err) {
            throw new AppError("CLient hasn't deleted successful");
        }
    }
}

export { DeleteClienteUseCase };
