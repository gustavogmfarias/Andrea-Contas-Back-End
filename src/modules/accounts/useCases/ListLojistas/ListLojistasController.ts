import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListLojistasUseCase } from "./ListLojistasUseCase";

class ListLojistasController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listLojistasUseCase = container.resolve(ListLojistasUseCase);

        const { perPage, page } = request.query;

        const all = await listLojistasUseCase.execute({ page, perPage });

        return response.status(201).send(all);
    }
}

export { ListLojistasController };
