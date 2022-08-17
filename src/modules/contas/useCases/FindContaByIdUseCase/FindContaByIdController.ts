import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindContaByIdUseCase } from "./FindContaByIdUseCase";

class FindContaByIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const findContaByIdUseCase = container.resolve(FindContaByIdUseCase);

        const { id } = request.params;

        const conta = await findContaByIdUseCase.execute(id);

        return response.status(200).send(conta);
    }
}

export { FindContaByIdController };
