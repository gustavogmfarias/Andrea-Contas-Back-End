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

        const clientesDTO = clientes.map(async (cliente) => {
            cliente.avatarUrl = this.clientesRepository.avatarUrl(cliente);
            const endereco = await this.clientesRepository.findEnderecoById(
                cliente.fk_id_endereco
            );

            return ClienteMap.toDTO(cliente, endereco);
        });

        return clientesDTO;
    }
}
export { ListClientesUseCase };
