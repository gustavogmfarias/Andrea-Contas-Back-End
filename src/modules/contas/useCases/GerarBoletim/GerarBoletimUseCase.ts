import { inject, injectable } from "tsyringe";
import { IContasRepository } from "@modules/contas/repositories/IContasRepository";
import { Conta } from "@prisma/client";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IListContasDTO } from "@modules/contas/dtos/IListContasDTO";
import { IPaginationRequestDTO } from "@shared/dtos/IPaginationRequestDTO";
import { IClientesRepository } from "@modules/clientes/repositories/IClientesRepository";

@injectable()
class GerarBoletimUseCase {
    constructor(
        @inject("ContasRepository")
        private contasRepository: IContasRepository,
        @inject("ClientesRepository")
        private clientesRepository: IClientesRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute(
        {
            startDate,
            endDate,
            inadimplentes,
            ativo,
            cliente,
            lojista,
        }: IListContasDTO,
        { page, perPage }: IPaginationRequestDTO
    ): Promise<object> {
        let dataAtual;
        const clientes = await this.clientesRepository.listClientes({
            page,
            perPage,
        });

        if (endDate) {
            endDate = this.dateProvider.addDaysToDate(endDate, 1);
        }

        if (inadimplentes) {
            dataAtual = this.dateProvider.dateNow();
        }

        const contas = await this.contasRepository.list(
            {
                startDate,
                endDate,
                inadimplentes,
                dataAtual,
                ativo,
                cliente,
                lojista,
            },
            {
                page,
                perPage,
            }
        );

        const contasAtivas = await this.contasRepository.list(
            {
                startDate,
                endDate,
                inadimplentes,
                dataAtual,
                ativo: true,
                cliente,
                lojista,
            },
            {
                page,
                perPage,
            }
        );

        const contasInadimplentes = await this.contasRepository.list(
            {
                startDate,
                endDate,
                inadimplentes: true,
                dataAtual: this.dateProvider.dateNow(),
                ativo: true,
                cliente,
                lojista,
            },
            {
                page,
                perPage,
            }
        );

        const totalClientesInadimplentes = [];

        contasInadimplentes.forEach((obj) => {
            const clienteAchado = totalClientesInadimplentes.find(
                (id) => id === obj.fkIdCliente
            );

            if (!clienteAchado) {
                totalClientesInadimplentes.push(obj.fkIdCliente);
            }
        });

        const totalContas = contas.length;
        const clientesAdimplentes =
            clientes.length - totalClientesInadimplentes.length;

        const faturamentoTotal = contas
            .reduce((acc, conta) => {
                return acc + conta.valorInicial;
            }, 0)
            .toFixed(2);

        const contasInativas = contas.reduce((acc, conta) => {
            return conta.ativo === false ? acc + 1 : acc;
        }, 0);

        const boletim = {
            faturamentoTotal,
            clientesAdimplentes,
            clientesInadimplentes: totalClientesInadimplentes.length,
            totalContas,
            contasAtivas: contasAtivas.length,
            contasInativas,
            contasAdimplentes: contasAtivas.length - contasInadimplentes.length,
            contasInadimplentes: contasInadimplentes.length,
        };

        // arrecadação total
        // total de vendas
        // adiplência
        // inadiplência entre períods

        return boletim;
    }
}
export { GerarBoletimUseCase };
