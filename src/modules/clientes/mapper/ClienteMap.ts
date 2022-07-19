import { instanceToInstance } from "class-transformer";
import { IClienteResponseDTO } from "../dtos/IClienteResponseDTO";
import { IEnderecoResponseDTO } from "../dtos/IEnderecoResponseDTO";

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
        }: IClienteResponseDTO,
        { rua, bairro, numero, cidade, estado, cep }: IEnderecoResponseDTO
    ) {
        const cliente = instanceToInstance({
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
