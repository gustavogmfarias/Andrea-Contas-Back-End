import { ICreateClienteDTO } from "@modules/clientes/dtos/ICreateClienteDTO";
import { IClientesRepository } from "@modules/clientes/repositories/IClientesRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICreateEnderecoDTO } from "@modules/clientes/dtos/ICreateEnderecoDTO";

@injectable()
class CreateClienteUseCase {
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
            avatarUrl,
        }: ICreateClienteDTO,
        { bairro, rua, cep, cidade, estado, numero }: ICreateEnderecoDTO
    ): Promise<void> {
        // const clienteExists = await this.clientesRepository.findByCpf(cpf);

        // if (clienteExists) {
        //     throw new AppError("Cliente already exists", 409);
        // }

        await this.clientesRepository.create(
            { nome, sobrenome, cpf, email, telefone, observacoes, avatarUrl },
            { bairro, rua, cep, cidade, estado, numero }
        );
    }
}

export { CreateClienteUseCase };
