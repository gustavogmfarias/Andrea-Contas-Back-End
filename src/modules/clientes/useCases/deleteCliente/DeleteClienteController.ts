import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteClienteUseCase } from "./DeleteClienteUseCase";

class DeleteClienteController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { cpf } = request.params;

        const deleteClienteUseCase = container.resolve(DeleteClienteUseCase);

        await deleteClienteUseCase.execute(cpf);

        return response.status(204).send();
    }
}

export { DeleteClienteController };
