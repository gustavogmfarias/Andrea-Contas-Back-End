import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetTotalClientesUseCase } from "./GetTotalClientesUseCase";

class GetTotalClientesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const getTotalClientesUseCase = container.resolve(
            GetTotalClientesUseCase
        );

        const { perPage, page } = request.query;

        const total = String(
            await getTotalClientesUseCase.execute({ page, perPage })
        );

        return response.status(200).json(total);
    }
}

export { GetTotalClientesController };
