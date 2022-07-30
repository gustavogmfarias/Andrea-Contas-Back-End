import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindByUserNameUseCase } from "./FindByUserNameUseCase";

interface IRequest {
    username: string;
}

class FindByUserNameController {
    async handle(request: Request, response: Response): Promise<Response> {
        const findByUserNameUseCase = container.resolve(FindByUserNameUseCase);

        const { username }: IRequest = request.body;

        const lojista = await findByUserNameUseCase.execute(username);

        return response.status(200).json(lojista);
    }
}

export { FindByUserNameController };
