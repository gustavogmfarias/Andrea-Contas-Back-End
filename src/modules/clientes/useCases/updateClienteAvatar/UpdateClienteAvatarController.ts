import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateClienteAvatarUseCase } from "./UpdateClienteAvatarUseCase";

class UpdateClienteAvatarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { cpf } = request.params;
        const avatarFile = request.file.filename;

        const updateClienteAvatarUseCase = container.resolve(
            UpdateClienteAvatarUseCase
        );

        await updateClienteAvatarUseCase.execute({ cpf, avatarFile });

        return response.status(201).send();
    }
}

export { UpdateClienteAvatarController };
