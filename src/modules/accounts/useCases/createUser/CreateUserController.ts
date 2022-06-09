import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";

class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, password, email, avatar_url, last_name } = request.body;
        const createUserUseCase = container.resolve(CreateUserUseCase);

        await createUserUseCase.execute({
            name,
            last_name,
            password,
            email,
            avatar_url,
        });

        return response.status(201).send();
    }
}

export { CreateUserController };
