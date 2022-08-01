import { ICreateClienteDTO } from "@modules/clientes/dtos/ICreateClienteDTO";
import { IClientesRepository } from "@modules/clientes/repositories/IClientesRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICreateEnderecoDTO } from "@modules/clientes/dtos/ICreateEnderecoDTO";
import { ILogProvider } from "@shared/container/providers/LogProvider/ILogProvider";
import { Cliente } from "@prisma/client";
import { ClienteMap } from "@modules/clientes/mapper/ClienteMap";
import { IClienteResponseDTO } from "@modules/clientes/dtos/IClienteResponseDTO";

@injectable()
class CreateClienteUseCase {
    constructor(
        @inject("ClientesRepository")
        private clientesRepository: IClientesRepository,
        @inject("LogProvider")
        private logProvider: ILogProvider
    ) {}

    async execute(
        lojista: string,
        {
            nome,
            sobrenome,
            cpf,
            email,
            telefone,
            observacoes,
            avatarUrl,
        }: ICreateClienteDTO,
        { bairro, rua, cep, cidade, estado, numero }: ICreateEnderecoDTO
    ): Promise<IClienteResponseDTO> {
        if (!cpf) {
            throw new AppError("Não pode cadastrar um cliente sem cpf", 400);
        }

        const clienteExists = await this.clientesRepository.findByCpf(cpf);

        if (clienteExists) {
            throw new AppError("Cliente already exists", 409);
        }

        let cliente;
        let clienteEndereco;

        try {
            cliente = await this.clientesRepository.create(
                {
                    nome,
                    sobrenome,
                    cpf,
                    email,
                    telefone,
                    observacoes,
                    avatarUrl,
                },
                { bairro, rua, cep, cidade, estado, numero }
            );

            clienteEndereco = await this.clientesRepository.findEnderecoById(
                cliente.fk_id_endereco
            );
        } catch {
            throw new AppError("Cliente não pode ser cadastrado", 400);
        }

        await this.logProvider.create({
            logRepository: "CLIENTE",
            descricao: `Cliente criado`,
            conteudoAnterior: JSON.stringify(cliente),
            conteudoNovo: JSON.stringify(cliente),
            lojistaId: lojista,
            modelAtualizadoId: cliente.id,
        });

        const clienteDTO = await ClienteMap.toDTO(cliente, clienteEndereco);

        return clienteDTO;
    }
}
export { CreateClienteUseCase };
