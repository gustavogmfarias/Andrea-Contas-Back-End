import { IPaginationRequestDTO } from "@shared/dtos/IPaginationRequestDTO";
import { IClienteResponseDTO } from "@modules/clientes/dtos/IClienteResponseDTO";
import { ClienteMap } from "@modules/clientes/mapper/ClienteMap";
import { IClientesRepository } from "@modules/clientes/repositories/IClientesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindByNameClientesUseCase {
    constructor(
        @inject("ClientesRepository")
        private clientesRepository: IClientesRepository
    ) {}

    async execute(
        nome: string,
        { page, perPage }: IPaginationRequestDTO
    ): Promise<IClienteResponseDTO[] | null> {
        const clientes = await this.clientesRepository.findByName(nome, {
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
export { FindByNameClientesUseCase };
