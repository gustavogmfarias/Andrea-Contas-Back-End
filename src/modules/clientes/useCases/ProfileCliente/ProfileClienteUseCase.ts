import { inject, injectable } from "tsyringe";
import { IClientesRepository } from "@modules/clientes/repositories/IClientesRepository";
import { ClienteMap } from "@modules/clientes/mapper/ClienteMap";
import { IClienteResponseDTO } from "@modules/clientes/dtos/IClienteResponseDTO";
import { AppError } from "@shared/errors/AppError";
import { IContasRepository } from "@modules/contas/repositories/IContasRepository";
import { IListContasDTO } from "@modules/contas/dtos/IListContasDTO";
import { IPaginationRequestDTO } from "@shared/dtos/IPaginationRequestDTO";
import { Cliente } from "@prisma/client";
import { IListPagamentosDTO } from "@modules/contas/dtos/IListPagamentosDTO";

@injectable()
class ProfileClienteUseCase {
    constructor(
        @inject("ClientesRepository")
        private clientesRepository: IClientesRepository,
        @inject("ContasRepository")
        private contasRepository: IContasRepository
    ) {}

    async execute(
        id: string,
        { startDate, endDate, inadimplentes, ativo, lojista }: IListContasDTO,
        { page, perPage }: IPaginationRequestDTO
    ): Promise<object> {
        const cliente = await this.clientesRepository.findById(id);
        const pagamentos = await this.contasRepository.listPagamentos(
            {
                startDate,
                endDate,
                fkIdCliente: id,
            },
            {
                page,
                perPage,
            }
        );

        if (!cliente) {
            throw new AppError("Cliente não encontrado", 404);
        }

        const endereco = await this.clientesRepository.findEnderecoById(
            cliente.fkIdEndereco
        );

        const contasCliente = await this.contasRepository.list(
            {
                startDate,
                endDate,
                inadimplentes,
                ativo,
                cliente: cliente.id,
                lojista,
            },
            {
                page,
                perPage,
            }
        );

        const totalContasClienteAtivas = contasCliente.reduce((acc, conta) => {
            return conta.ativo === true ? acc + 1 : acc;
        }, 0);

        const valorTotalContasCliente = contasCliente
            .reduce((acc, conta) => {
                return acc + conta.valorInicial;
            }, 0)
            .toFixed(2);

        const valorDevedorCliente = contasCliente
            .reduce((acc, conta) => {
                return conta.ativo === true ? acc + conta.valorAtual : acc;
            }, 0)
            .toFixed(2);

        const ultimoPagamentoCliente =
            await this.contasRepository.ultimoPagamento({ fkIdCliente: id });

        const ultimaContaCliente = await this.contasRepository.ultimaConta({
            cliente: id,
        });

        const clienteProfileDTO = ClienteMap.updateToDTO(cliente, endereco);
        clienteProfileDTO.avatarUrl =
            this.clientesRepository.avatarUrl(cliente);

        const profileCliente = {
            clienteProfileDTO,
            contasCliente,
            totalContasCliente: contasCliente.length,
            totalContasClienteAtivas,
            ultimaContaCliente,
            pagamentos,
            ultimoPagamentoCliente,
            valorTotalContasCliente,
            valorDevedorCliente,
        };

        return profileCliente;
    }
}
export { ProfileClienteUseCase };
