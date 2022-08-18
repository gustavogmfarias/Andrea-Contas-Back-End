import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetTotalClientesAdimplentesUseCase } from "./GetTotalClientesAdimplentesUseCase";

class GetTotalClientesAdimplentesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const getTotalClientesUseCase = container.resolve(
            GetTotalClientesAdimplentesUseCase
        );

        const inadimplentes = true;
        const ativo = true;

        const { perPage, page } = request.query;

        const total = String(
            await getTotalClientesUseCase.execute(
                { page, perPage },
                {
                    inadimplentes,
                    ativo,
                }
            )
        );

        return response.status(200).json(total);
    }
}

export { GetTotalClientesAdimplentesController };
