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

        // if (!cliente) {
        //     throw new AppError("Cliente doesn't exist", 404);
        // }

        // if (nome) {
        //     cliente.nome = nome;
        // }

        // if (sobrenome) {
        //     cliente.sobrenome = sobrenome;
        // }

        // if (cpf) {
        //     cliente.cpf = cpf;
        // }

        // if (email) {
        //     cliente.email = email;
        // }

        // if (telefone) {
        //     cliente.telefone = telefone;
        // }
        // if (observacoes) {
        //     cliente.observacoes = observacoes;
        // }

        // const endereco = await prisma.endereco.findUnique({
        //     where: {
        //         id: cliente.fk_id_endereco,
        //     },
        // });

        // if (rua) {
        //     endereco.rua = email;
        // }
        // if (bairro) {
        //     endereco.bairro = bairro;
        // }

        // if (numero) {
        //     endereco.numero = numero;
        // }

        // if (cidade) {
        //     endereco.cidade = cidade;
        // }

        // if (estado) {
        //     endereco.estado = estado;
        // }

        // if (cep) {
        //     endereco.cep = cep;
        // }

        await this.clientesRepository.update(
            { nome, sobrenome, cpf, email, telefone, observacoes },
            { rua, bairro, numero, cidade, estado, cep }
        );

        return cliente;
    }
}

export { UpdateClienteUseCase };
