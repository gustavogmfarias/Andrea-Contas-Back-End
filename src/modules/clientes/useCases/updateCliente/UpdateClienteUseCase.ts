import { IClientesRepository } from "@modules/clientes/repositories/IClientesRepository";
import { ICreateClienteDTO } from "@modules/clientes/dtos/ICreateClienteDTO";
import { AppError } from "@shared/errors/AppError";
import { injectable, inject } from "tsyringe";
import { ICreateEnderecoDTO } from "@modules/clientes/dtos/ICreateEnderecoDTO";
import { ILogProvider } from "@shared/container/providers/LogProvider/ILogProvider";
import { ClienteMap } from "@modules/clientes/mapper/ClienteMap";
import { IClienteResponseDTO } from "@modules/clientes/dtos/IClienteResponseDTO";
import { Log } from "@prisma/client";

@injectable()
class UpdateClienteUseCase {
    constructor(
        @inject("ClientesRepository")
        private clientesRepository: IClientesRepository,
        @inject("LogProvider") private logProvider: ILogProvider
    ) {}

    async execute(
        lojistaId: string,
        {
            id,
            nome,
            sobrenome,
            cpf,
            email,
            telefone,
            observacoes,
        }: ICreateClienteDTO,
        { bairro, rua, cep, cidade, estado, numero }: ICreateEnderecoDTO
    ): Promise<(IClienteResponseDTO | Log)[]> {
        const clienteAnterior = await this.clientesRepository.findById(id);
        let clienteAtualizado;
        let clienteEndereco;

        if (!clienteAnterior) {
            throw new AppError("Cliente doesn't exist", 404);
        }

        try {
            clienteAtualizado = await this.clientesRepository.update(
                {
                    id,
                    nome,
                    sobrenome,
                    cpf,
                    email,
                    telefone,
                    observacoes,
                },
                { bairro, rua, cep, cidade, estado, numero }
            );

            clienteEndereco = await this.clientesRepository.findEnderecoById(
                clienteAtualizado.fkIdEndereco
            );
        } catch (err) {
            return err.message;
            throw new AppError("Cliente não pode ser atualizado", 400);
        }

        const enderecoClienteAtualizado =
            await this.clientesRepository.findEnderecoById(
                clienteAnterior.fkIdEndereco
            );

        const log = await this.logProvider.create({
            logRepository: "CLIENTE",
            descricao: `Cliente atualizado com sucesso!`,
            conteudoAnterior: JSON.stringify(clienteAnterior),
            conteudoNovo: JSON.stringify(clienteAtualizado),
            lojistaId,
            modelAtualizadoId: id,
        });

        const clienteDTO = ClienteMap.updateToDTO(
            clienteAtualizado,
            enderecoClienteAtualizado
        );
        clienteDTO.avatarUrl =
            this.clientesRepository.avatarUrl(clienteAtualizado);

        return [clienteDTO, log];
    }
}

export { UpdateClienteUseCase };
