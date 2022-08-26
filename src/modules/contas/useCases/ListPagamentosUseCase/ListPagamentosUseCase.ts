import { inject, injectable } from "tsyringe";
import { IContasRepository } from "@modules/contas/repositories/IContasRepository";
import { Pagamento } from "@prisma/client";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IPaginationRequestDTO } from "@shared/dtos/IPaginationRequestDTO";
import { IListPagamentosDTO } from "@modules/contas/dtos/IListPagamentosDTO";

@injectable()
class ListPagamentosUseCase {
    constructor(
        @inject("ContasRepository")
        private contasRepository: IContasRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute(
        { startDate, endDate, fkIdCliente }: IListPagamentosDTO,
        { page, perPage }: IPaginationRequestDTO
    ): Promise<Pagamento[]> {
        if (endDate) {
            endDate = this.dateProvider.addDaysToDate(endDate, 1);
        }

        const pagamentos = await this.contasRepository.listPagamentos(
            {
                startDate,
                endDate,
                fkIdCliente,
            },
            {
                page,
                perPage,
            }
        );

        return pagamentos;
    }
}
export { ListPagamentosUseCase };
