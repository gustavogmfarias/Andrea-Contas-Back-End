import { instanceToInstance } from "class-transformer";
import { IClienteResponseDTO } from "../dtos/IClienteResponseDTO";
import { IEnderecoResponseDTO } from "../dtos/IEnderecoResponseDTO";
import { ClientesRepository } from "../repositories/infra/ClientesRepository";

class ClienteMap {
    static toDTO({
        id,
        nome,
        sobrenome,
        cpf,
        email,
        telefone,
        observacoes,
        avatarUrl,
        endereco: { rua, bairro, numero, cidade, estado, cep },
    }: IClienteResponseDTO) {
        const cliente = instanceToInstance({
            id,
            nome,
            sobrenome,
            cpf,
            email,
            telefone,
            observacoes,
            avatarUrl,
            endereco: { rua, bairro, numero, cidade, estado, cep },
        });
        return cliente;
    }

    static updateToDTO(
        {
            id,
            nome,
            sobrenome,
            cpf,
            email,
            telefone,
            observacoes,
            avatarUrl,
        }: IClienteResponseDTO,
        { rua, bairro, numero, cidade, estado, cep }: IEnderecoResponseDTO
    ) {
        const cliente = instanceToInstance({
            id,
            nome,
            sobrenome,
            cpf,
            email,
            telefone,
            observacoes,
            avatarUrl,
            endereco: { rua, bairro, numero, cidade, estado, cep },
        });
        return cliente;
    }
}

export { ClienteMap };
