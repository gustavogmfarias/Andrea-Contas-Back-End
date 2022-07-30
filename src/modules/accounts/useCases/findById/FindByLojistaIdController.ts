import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindByLojistaIdUseCase } from "./FindByLojistaIdUseCase";

class FindByLojistaIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const findByLojistaIdUseCase = container.resolve(
            FindByLojistaIdUseCase
        );

        const { id } = request.params;

        const lojista = await findByLojistaIdUseCase.execute(id);

        return response.status(200).send(lojista);
    }
}

export { FindByLojistaIdController };
