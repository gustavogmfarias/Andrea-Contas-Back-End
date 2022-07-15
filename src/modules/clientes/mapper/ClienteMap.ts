import { Cliente } from "@prisma/client";
import { instanceToInstance } from "class-transformer";
import { IClienteResponseDTO } from "../dtos/IClienteResponseDTO";

class ClienteMap {
    static toDTO({
        nome,
        sobrenome,
        cpf,
        email,
        telefone,
        observacoes,
        avatarUrl,
    }: Cliente): IClienteResponseDTO {
        const cliente = instanceToInstance({
            nome,
            sobrenome,
            cpf,
            email,
            telefone,
            observacoes,
            avatarUrl,
        });
        return cliente;
    }
}

export { ClienteMap };
