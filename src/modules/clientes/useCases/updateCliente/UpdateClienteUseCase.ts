import { IClientesRepository } from "@modules/clientes/repositories/IClientesRepository";
import { ICreateClienteDTO } from "@modules/clientes/dtos/ICreateClienteDTO";
import { Cliente } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { injectable, inject } from "tsyringe";
import { ICreateEnderecoDTO } from "@modules/clientes/dtos/ICreateEnderecoDTO";
import { prisma } from "@shared/database/prismaClient";

@injectable()
class UpdateClienteUseCase {
    constructor(
        @inject("ClientesRepository")
        private clientesRepository: IClientesRepository
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
        const cliente = await this.clientesRepository.findByCpf(cpf);

        await this.clientesRepository.update(
            { nome, sobrenome, cpf, email, telefone, observacoes },
            { rua, bairro, numero, cidade, estado, cep }
        );

        return cliente;
    }
}

export { UpdateClienteUseCase };
