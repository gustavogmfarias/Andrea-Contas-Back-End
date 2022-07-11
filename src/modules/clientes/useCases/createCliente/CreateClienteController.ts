import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateClienteUseCase } from "./CreateClienteUseCase";

class CreateClienteController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            nome,
            sobrenome,
            cpf,
            email,
            telefone,
            observacoes,
            bairro,
            rua,
            cep,
            cidade,
            estado,
            numero,
        } = request.body;

        const createClienteUseCase = container.resolve(CreateClienteUseCase);

        await createClienteUseCase.execute(
            { nome, sobrenome, cpf, email, telefone, observacoes },
            {
                bairro,
                rua,
                cep,
                cidade,
                estado,
                numero,
            }
        );

        return response.status(201).send();
    }
}

export { CreateClienteController };
