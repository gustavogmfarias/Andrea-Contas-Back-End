import { IListPagamentosDTO } from "@modules/contas/dtos/IListPagamentosDTO";
import { IPaginationRequestDTO } from "@shared/dtos/IPaginationRequestDTO";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ProfileClienteUseCase } from "./ProfileClienteUseCase";

class ProfileClienteController {
    async handle(request: Request, response: Response): Promise<Response> {
        const profileClienteUseCase = container.resolve(ProfileClienteUseCase);

        const { id } = request.params;

        const { page, perPage }: IPaginationRequestDTO = request.query;
        const { startDate, endDate }: IListPagamentosDTO = request.body;

        const cliente = await profileClienteUseCase.execute(
            id,
            { startDate, endDate },
            { page, perPage }
        );

        return response.status(200).json(cliente);
    }
}

export { ProfileClienteController };
