import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListLojistasUseCase } from "./ListLojistasUseCase";

class ListLojistasController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listLojistasUseCase = container.resolve(ListLojistasUseCase);

        const { per_page, page } = request.query;

        const all = await listLojistasUseCase.execute({ page, per_page });

        return response.json(all);
    }
}

export { ListLojistasController };
