import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateLojistaUseCase } from "./UpdateLojistaUseCase";

class UpdateLojistaController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const { username, password, old_password, confirm_password } =
            request.body;

        const updateLojistaUseCase = container.resolve(UpdateLojistaUseCase);

        await updateLojistaUseCase.execute({
            username,
            password,
            old_password,
            confirm_password,
            id,
        });

        return response.status(200).json();
    }
}

export { UpdateLojistaController };
