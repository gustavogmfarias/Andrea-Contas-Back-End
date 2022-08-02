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

    async execute({ page, perPage }): Promise<IClienteResponseDTO[]> {
        const clientes = await this.clientesRepository.listClientes({
            page,
            perPage,
        });

        let clienteEndereco;

        const clientesDTO = clientes.map((cliente) => {
            cliente.avatarUrl = this.clientesRepository.avatarUrl(cliente);
            clienteEndereco = this.clientesRepository.findEnderecoById(
                cliente.fkIdEndereco
            );

            return ClienteMap.toDTO(cliente, clienteEndereco);
        });

        return clientesDTO;
    }
}
export { ListClientesUseCase };
