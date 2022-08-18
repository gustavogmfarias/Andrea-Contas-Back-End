import { inject, injectable } from "tsyringe";
import { IClientesRepository } from "@modules/clientes/repositories/IClientesRepository";
import { IContasRepository } from "@modules/contas/repositories/IContasRepository";
import { IListContasDTO } from "@modules/contas/dtos/IListContasDTO";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { Conta } from "@prisma/client";

@injectable()
class GetTotalClientesInadimplentesUseCase {
    constructor(
        @inject("ClientesRepository")
        private clientesRepository: IClientesRepository,
        @inject("ContasRepository")
        private contasRepository: IContasRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute(
        { page, perPage },
        {
            startDate,
            endDate,
            inadimplentes,
            ativo,
            cliente,
            lojista,
        }: IListContasDTO
    ): Promise<number> {
        const clientes = await this.clientesRepository.listClientes({
            page,
            perPage,
        });

        const dataAtual = this.dateProvider.dateNow();

        const contas = await this.contasRepository.list(
            {
                ativo: true,
            },
            {
                page,
                perPage,
            }
        );

        const contasInadimplentes = await this.contasRepository.list(
            {
                inadimplentes,
                ativo,
                dataAtual,
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

        return Number(totalClientesInadimplentes.length);
    }
}
export { GetTotalClientesInadimplentesUseCase };
