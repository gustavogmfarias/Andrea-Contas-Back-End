import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateClienteUseCase } from "./UpdateClienteUseCase";

class UpdateClienteController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: lojistaId } = request.lojista;
        const { id } = request.params;

        const {
            cpf,
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

        const clienteAtualizado = await updateClienteUseCase.execute(
            lojistaId,
            { nome, sobrenome, cpf, id, email, telefone, observacoes },
            { rua, bairro, numero, cidade, estado, cep }
        );

        return response.status(200).send(clienteAtualizado);
    }
}

export { UpdateClienteController };
