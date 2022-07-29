import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteLojistaUseCase } from "./DeleteLojistaUseCase";

class DeleteLojistaController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const deleteLojistaUseCase = container.resolve(DeleteLojistaUseCase);

        await deleteLojistaUseCase.execute(id);

        return response.status(200).send();
    }
}

export { DeleteLojistaController };
