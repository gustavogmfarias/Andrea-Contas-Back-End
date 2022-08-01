import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateClienteUseCase } from "./CreateClienteUseCase";

class CreateClienteController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: lojista } = request.lojista;

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

        const cliente = await createClienteUseCase.execute(
            lojista,
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

        return response.status(201).send(cliente);
    }
}

export { CreateClienteController };
