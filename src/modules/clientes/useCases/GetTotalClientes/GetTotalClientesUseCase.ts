import { inject, injectable } from "tsyringe";
import { IClientesRepository } from "@modules/clientes/repositories/IClientesRepository";
import { ClienteMap } from "@modules/clientes/mapper/ClienteMap";
import { IClienteResponseDTO } from "@modules/clientes/dtos/IClienteResponseDTO";

@injectable()
class GetTotalClientesUseCase {
    constructor(
        @inject("ClientesRepository")
        private clientesRepository: IClientesRepository
    ) {}

    async execute({ page, perPage }): Promise<number> {
        const clientes = await this.clientesRepository.listClientes({
            page,
            perPage,
        });

        const totalClientes = clientes.length;

        return totalClientes;
    }
}
export { GetTotalClientesUseCase };
