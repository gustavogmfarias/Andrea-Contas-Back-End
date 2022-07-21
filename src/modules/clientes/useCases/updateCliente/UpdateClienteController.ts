import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateClienteUseCase } from "./UpdateClienteUseCase";

class UpdateClienteController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { lojista } = request.lojista;
        const { cpf } = request.params;

        const {
            nome,
            sobrenome,
            email,
            telefone,
            observacoes,
            rua,
            bairro,
            numero,
            cidade,
            estado,
            cep,
        } = request.body;

        const updateClienteUseCase = container.resolve(UpdateClienteUseCase);

        await updateClienteUseCase.execute(
            lojista,
            { nome, sobrenome, cpf, email, telefone, observacoes },
            { rua, bairro, numero, cidade, estado, cep }
        );

        return response.status(200).json();
    }
}

export { UpdateClienteController };
