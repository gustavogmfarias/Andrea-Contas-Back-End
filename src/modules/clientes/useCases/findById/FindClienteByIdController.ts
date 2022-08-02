import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindClienteByIdUseCase } from "./FindClienteByIdUseCase";

class FindClienteByIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const findClienteByIdUseCase = container.resolve(
            FindClienteByIdUseCase
        );

        const { id } = request.params;

        const cliente = await findClienteByIdUseCase.execute(id);

        return response.status(200).send(cliente);
    }
}

export { FindClienteByIdController };
