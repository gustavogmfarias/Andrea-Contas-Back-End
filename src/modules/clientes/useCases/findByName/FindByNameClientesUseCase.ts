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
        { page, per_page }: IPaginationRequestDTO
    ): Promise<IClienteResponseDTO[] | null> {
        const clientes = await this.clientesRepository.findByName(nome, {
            page,
            per_page,
        });

        const clientesDTO = clientes.map((cliente) => {
            return ClienteMap.toDTO(cliente);
        });

        return clientesDTO;
    }
}
export { FindByNameClientesUseCase };
