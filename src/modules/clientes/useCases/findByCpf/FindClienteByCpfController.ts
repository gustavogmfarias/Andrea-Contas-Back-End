import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindClienteByCpfUseCase } from "./FindClienteByCpfUseCase";

class FindClienteByCpfController {
    async handle(request: Request, response: Response): Promise<Response> {
        const findClienteByCpfUseCase = container.resolve(
            FindClienteByCpfUseCase
        );

        const { cpf } = request.params;

        const cliente = await findClienteByCpfUseCase.execute(cpf);

        return response.status(200).send(cliente);
    }
}

export { FindClienteByCpfController };
