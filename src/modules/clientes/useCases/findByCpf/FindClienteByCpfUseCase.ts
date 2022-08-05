import { inject, injectable } from "tsyringe";
import { IClientesRepository } from "@modules/clientes/repositories/IClientesRepository";
import { ClienteMap } from "@modules/clientes/mapper/ClienteMap";
import { IClienteResponseDTO } from "@modules/clientes/dtos/IClienteResponseDTO";
import { AppError } from "@shared/errors/AppError";

@injectable()
class FindClienteByCpfUseCase {
    constructor(
        @inject("ClientesRepository")
        private clientesRepository: IClientesRepository
    ) {}

    async execute(cpf: string): Promise<IClienteResponseDTO> {
        const cliente = await this.clientesRepository.findByCpf(cpf);

        if (!cliente) {
            throw new AppError("Cliente não encontrado", 404);
        }

        const endereco = await this.clientesRepository.findEnderecoById(
            cliente.fkIdEndereco
        );

        const clienteDTO = ClienteMap.updateToDTO(cliente, endereco);

        return clienteDTO;
    }
}
export { FindClienteByCpfUseCase };
