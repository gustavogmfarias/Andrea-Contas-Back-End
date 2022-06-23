import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUsersUseCase } from "./ListUsersUseCase";

class ListUsersController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listUsersUseCase = container.resolve(ListUsersUseCase);

        const page = request.params;
        const per_page = request.params;

        const all = await listUsersUseCase.execute({ page, per_page });

        return response.json(all);
    }
}

export { ListUsersController };
