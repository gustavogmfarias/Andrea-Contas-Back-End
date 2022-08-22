import { inject, injectable } from "tsyringe";
import { IContasRepository } from "@modules/contas/repositories/IContasRepository";
import { Conta } from "@prisma/client";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IListContasDTO } from "@modules/contas/dtos/IListContasDTO";
import { IPaginationRequestDTO } from "@shared/dtos/IPaginationRequestDTO";

@injectable()
class GetTotalAReceberUseCase {
    constructor(
        @inject("ContasRepository")
        private contasRepository: IContasRepository,
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
    ): Promise<string> {
        let dataAtual;

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

        const totalAReceber = contas
            .reduce((acc, conta) => {
                return acc + conta.valorAtual;
            }, 0)
            .toFixed(2);

        return totalAReceber;
    }
}
export { GetTotalAReceberUseCase };
