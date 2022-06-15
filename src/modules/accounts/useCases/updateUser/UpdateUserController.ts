import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const {
            name,
            last_name,
            password,
            old_password,
            confirm_password,
            email,
            role,
        } = request.body;

        const updateUserUseCase = container.resolve(UpdateUserUseCase);

        await updateUserUseCase.execute({
            name,
            last_name,
            password,
            old_password,
            confirm_password,
            email,
            id,
            role,
        });

        return response.status(200).json();
    }
}

export { UpdateUserController };
