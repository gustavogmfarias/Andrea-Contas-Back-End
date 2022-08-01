import { ICreateClienteDTO } from "@modules/clientes/dtos/ICreateClienteDTO";
import { IClientesRepository } from "@modules/clientes/repositories/IClientesRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICreateEnderecoDTO } from "@modules/clientes/dtos/ICreateEnderecoDTO";
import { ILogProvider } from "@shared/container/providers/LogProvider/ILogProvider";
import { Cliente } from "@prisma/client";
import { ClienteMap } from "@modules/clientes/mapper/ClienteMap";

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
    ): Promise<Cliente> {
        const clienteExists = await this.clientesRepository.findByCpf(cpf);

        if (clienteExists) {
            throw new AppError("Cliente already exists", 409);
        }

        const cliente = await this.clientesRepository.create(
            { nome, sobrenome, cpf, email, telefone, observacoes, avatarUrl },
            { bairro, rua, cep, cidade, estado, numero }
        );

        let clienteDTO;
        if (cliente) {
            await this.logProvider.create({
                logRepository: "CLIENTE",
                descricao: `Cliente criado`,
                conteudoAnterior: JSON.stringify(cliente),
                conteudoNovo: JSON.stringify(cliente),
                lojistaId: lojista,
                modelAtualizadoId: cliente.id,
            });

            const clienteEndereco =
                await this.clientesRepository.findEnderecoById(
                    cliente.fk_id_endereco
                );

            clienteDTO = await ClienteMap.toDTO(cliente, clienteEndereco);

            return clienteDTO;
        }

        throw new AppError("Cliente não pode ser cadastrado", 400);
    }
}

export { CreateClienteUseCase };
