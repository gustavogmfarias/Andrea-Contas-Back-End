import { Request, Response } from "express";
import { container } from "tsyringe";
import { ChangeOwnPasswordUseCase } from "./ChangeOwnPasswordUseCase";

class ChangeOwnPasswordController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.lojista;

        const { password, old_password, confirm_password } = request.body;

        const changeOwnPasswordUseCase = container.resolve(
            ChangeOwnPasswordUseCase
        );

        await changeOwnPasswordUseCase.execute({
            password,
            old_password,
            confirm_password,
            id,
        });

        return response.status(200).json();
    }
}

export { ChangeOwnPasswordController };
