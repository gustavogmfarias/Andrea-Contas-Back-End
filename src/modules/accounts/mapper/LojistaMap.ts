import { Lojista } from "@prisma/client";
import { instanceToInstance } from "class-transformer";
import { ILojistaResponseDTO } from "../dtos/ILojistaResponseDTO";

class LojistaMap {
    static toDTO({ username, nome }: Lojista): ILojistaResponseDTO {
        const lojista = instanceToInstance({
            username,
            nome,
        });
        return lojista;
    }
}

export { LojistaMap };
