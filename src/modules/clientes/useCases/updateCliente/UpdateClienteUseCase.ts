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
        lojista,
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
            descricao: `Cliente atualizado`,
            conteudoAnterior: JSON.stringify(clienteAnterior),
            conteudoNovo: JSON.stringify(cliente),
            lojistaId: lojista,
            modelEditadoId: cliente.id,
        });

        return cliente;
    }
}

export { UpdateClienteUseCase };
