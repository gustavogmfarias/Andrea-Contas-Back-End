import { IPaginationRequestDTO } from "@shared/dtos/IPaginationRequestDTO";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { IListPagamentosDTO } from "@modules/contas/dtos/IListPagamentosDTO";
import { ListPagamentosUseCase } from "./ListPagamentosUseCase";

class ListPagamentosController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listPagamentosUseCase = container.resolve(ListPagamentosUseCase);
        const { page, perPage }: IPaginationRequestDTO = request.query;
        const { startDate, endDate, fkIdCliente }: IListPagamentosDTO =
            request.body;

        const all = await listPagamentosUseCase.execute(
            {
                startDate,
                endDate,
                fkIdCliente,
            },
            { page, perPage }
        );

        return response.status(200).send(all);
    }
}

export { ListPagamentosController };
