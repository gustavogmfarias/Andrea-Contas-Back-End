import { Cliente, Endereco } from "@prisma/client";
import { instanceToInstance } from "class-transformer";
import { IClienteResponseDTO } from "../dtos/IClienteResponseDTO";

class ClienteMap {
    static toDTO(
        {
            nome,
            sobrenome,
            cpf,
            email,
            telefone,
            observacoes,
            avatarUrl,
        }: Cliente,
        { rua, bairro, numero, cidade, estado, cep }: Endereco
    ): IClienteResponseDTO {
        const cliente = instanceToInstance({
            nome,
            sobrenome,
            cpf,
            email,
            telefone,
            observacoes,
            avatarUrl,
            endereco: {
                rua,
                bairro,
                numero,
                cidade,
                estado,
                cep,
            },
        });
        return cliente;
    }
}

export { ClienteMap };
