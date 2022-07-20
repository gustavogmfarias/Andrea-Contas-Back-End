import { IClientesRepository } from "@modules/clientes/repositories/IClientesRepository";
import { ICreateClienteDTO } from "@modules/clientes/dtos/ICreateClienteDTO";
import { Cliente } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { injectable, inject } from "tsyringe";
import { ICreateEnderecoDTO } from "@modules/clientes/dtos/ICreateEnderecoDTO";
import { prisma } from "@shared/database/prismaClient";
import { ILogProvider } from "@shared/container/providers/LogProvider/ILogProvider";

@injectable()
class UpdateClienteUseCase {
    constructor(
        @inject("ClientesRepository")
        private clientesRepository: IClientesRepository,
        @inject("LogProvider") private logProvider: ILogProvider
    ) {}

    async execute(
        {
            nome,
            sobrenome,
            cpf,
            email,
            telefone,
            observacoes,
        }: ICreateClienteDTO,
        { rua, bairro, numero, cidade, estado, cep }: ICreateEnderecoDTO
    ): Promise<Cliente> {
        const clienteAnterior = await this.clientesRepository.findByCpf(cpf);

        const cliente = await this.clientesRepository.update(
            { nome, sobrenome, cpf, email, telefone, observacoes },
            { rua, bairro, numero, cidade, estado, cep }
        );

        await this.logProvider.create({
            logRepository: "CLIENTE",
            descricao: `Cliente ${cliente.cpf} atualizado com sucesso por ${cliente.id}`,
            conteudoAnterior: JSON.stringify(clienteAnterior),
            conteudoNovo: JSON.stringify(cliente),
            lojistaId: "3ce0eb2d-7db9-4228-a148-c411ebf6e454",
        });

        return cliente;
    }
}

export { UpdateClienteUseCase };
