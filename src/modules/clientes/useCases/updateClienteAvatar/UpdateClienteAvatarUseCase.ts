import { inject, injectable } from "tsyringe";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { AppError } from "@shared/errors/AppError";
import { ICreateClienteDTO } from "@modules/clientes/dtos/ICreateClienteDTO";
import { IClientesRepository } from "../../repositories/IClientesRepository";

interface IRequest {
    cpf: string;
    avatarFile: string;
    avatarUrl?: string;
}

@injectable()
class UpdateClienteAvatarUseCase {
    constructor(
        @inject("ClientesRepository")
        private clientesRepository: IClientesRepository,
        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ) {}

    async execute({ cpf, avatarFile }: IRequest): Promise<void> {
        const cliente = await this.clientesRepository.findByCpf(cpf);
        const endereco = await this.clientesRepository.findEnderecoById(
            cliente.fkIdEndereco
        );

        const { nome, sobrenome, email, telefone, observacoes } = cliente;
        const { rua, bairro, numero, cidade, estado, cep } = endereco;

        if (!cliente) {
            throw new AppError("Cliente doesn't exist");
        }

        if (cliente.avatarUrl) {
            await this.storageProvider.delete(cliente.avatarUrl, "avatar");
        }

        await this.storageProvider.save(avatarFile, "avatar");

        const avatarUrl = avatarFile;

        await this.clientesRepository.update(
            { nome, sobrenome, cpf, email, telefone, observacoes, avatarUrl },
            { rua, bairro, numero, cidade, estado, cep }
        );
    }
}

export { UpdateClienteAvatarUseCase };
