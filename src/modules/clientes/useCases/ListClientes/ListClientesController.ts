import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListClientesUseCase } from "./ListClientesUseCase";

class ListClientesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listClientesUseCase = container.resolve(ListClientesUseCase);

        const { per_page, page } = request.query;

        const all = await listClientesUseCase.execute({ page, per_page });

        return response.json(all);
    }
}

export { ListClientesController };
