import { IClienteResponseDTO } from "@modules/clientes/dtos/IClienteResponseDTO";
import { ClienteMap } from "@modules/clientes/mapper/ClienteMap";
import { IClientesRepository } from "@modules/clientes/repositories/IClientesRepository";
import { Log } from "@prisma/client";
import { ILogProvider } from "@shared/container/providers/LogProvider/ILogProvider";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { AppError } from "@shared/errors/AppError";
import { injectable, inject } from "tsyringe";

@injectable()
class DeleteClienteUseCase {
    constructor(
        @inject("ClientesRepository")
        private clientesRepository: IClientesRepository,
        @inject("LogProvider") private logProvider: ILogProvider,
        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ) {}

    async execute(
        id: string,
        lojistaId: string
    ): Promise<(IClienteResponseDTO | Log)[]> {
        const clienteDeletado = await this.clientesRepository.findById(id);

        if (!clienteDeletado) {
            throw new AppError("Cliente doesn't exist", 404);
        }

        const clienteDeletadoTemContaAtiva =
            await this.clientesRepository.findClienteContaAtiva(id);

        if (clienteDeletadoTemContaAtiva) {
            throw new AppError(
                "Não pode deletar um cliente se ele estiver uma conta ativa!",
                400
            );
        }

        const enderecoClienteDeletado =
            await this.clientesRepository.findEnderecoById(
                clienteDeletado.fkIdEndereco
            );

        const clienteDeletadoDTO = ClienteMap.updateToDTO(
            clienteDeletado,
            enderecoClienteDeletado
        );

        try {
            await this.clientesRepository.delete(id);
        } catch (err) {
            throw new AppError("CLient hasn't deleted successful");
        }

        if (clienteDeletado.avatarUrl) {
            await this.storageProvider.delete(
                clienteDeletado.avatarUrl,
                "avatar"
            );
        }

        const log = await this.logProvider.create({
            logRepository: "CLIENTE",
            descricao: `Cliente deletado com Sucesso!`,
            conteudoAnterior: JSON.stringify(clienteDeletadoDTO),
            conteudoNovo: JSON.stringify(clienteDeletadoDTO),
            lojistaId,
            modelAtualizadoId: clienteDeletado.id,
        });

        return [clienteDeletadoDTO, log];
    }
}

export { DeleteClienteUseCase };
