import { IPaginationRequestDTO } from "@shared/dtos/IPaginationRequestDTO";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { IListContasDTO } from "@modules/contas/dtos/IListContasDTO";
import { ListContasUseCase } from "./ListContasUseCase";

class ListContasController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listContasUseCase = container.resolve(ListContasUseCase);
        const { page, perPage }: IPaginationRequestDTO = request.query;
        const {
            startDate,
            endDate,
            inadimplentes,
            ativo,
            cliente,
            lojista,
        }: IListContasDTO = request.body;

        const all = await listContasUseCase.execute(
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

        return response.status(200).send(all);
    }
}

export { ListContasController };
