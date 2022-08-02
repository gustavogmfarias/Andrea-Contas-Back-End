import { IPaginationRequestDTO } from "@shared/dtos/IPaginationRequestDTO";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindByNameClientesUseCase } from "./FindByNameClientesUseCase";

interface IRequest {
    page?: number;
    perPage?: number;
    nome?: string;
}

class FindByNameClientesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const findByNameClientesUseCase = container.resolve(
            FindByNameClientesUseCase
        );

        const { nome }: IRequest = request.body;

        const { page, perPage }: IRequest = request.query;

        const all = await findByNameClientesUseCase.execute(nome, {
            page,
            perPage,
        });

        return response.json(all);
    }
}

export { FindByNameClientesController };
