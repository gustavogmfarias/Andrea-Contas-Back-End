import { inject, injectable } from "tsyringe";
import { IClientesRepository } from "@modules/clientes/repositories/IClientesRepository";
import { ClienteMap } from "@modules/clientes/mapper/ClienteMap";
import { IClienteResponseDTO } from "@modules/clientes/dtos/IClienteResponseDTO";

@injectable()
class ListClientesUseCase {
    constructor(
        @inject("ClientesRepository")
        private clientesRepository: IClientesRepository
    ) {}

    async execute({ page, per_page }): Promise<IClienteResponseDTO[]> {
        const clientes = await this.clientesRepository.listClientes({
            page,
            per_page,
        });

        const clientesDTO = clientes.map((cliente) => {
            return ClienteMap.toDTO(cliente);
        });
        return clientesDTO;
    }
}
export { ListClientesUseCase };
