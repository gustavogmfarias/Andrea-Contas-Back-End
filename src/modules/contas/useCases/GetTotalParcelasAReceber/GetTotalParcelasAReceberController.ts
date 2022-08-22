import { IPaginationRequestDTO } from "@shared/dtos/IPaginationRequestDTO";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { IListContasDTO } from "@modules/contas/dtos/IListContasDTO";
import { GetTotalParcelasAReceberUseCase } from "./GetTotalParcelasAReceberUseCase";

class GetTotalParcelasAReceberController {
    async handle(request: Request, response: Response): Promise<Response> {
        const getTotalParcelasAReceber = container.resolve(
            GetTotalParcelasAReceberUseCase
        );
        const { page, perPage }: IPaginationRequestDTO = request.query;
        const {
            startDate,
            endDate,
            inadimplentes,
            ativo,
            cliente,
            lojista,
        }: IListContasDTO = request.body;

        const all = await getTotalParcelasAReceber.execute(
            {
                startDate,
                endDate,
                inadimplentes,
                ativo,
                cliente,
                lojista,
            },
            { page, perPage }
        );

        return response.status(200).json(all);
    }
}

export { GetTotalParcelasAReceberController };
