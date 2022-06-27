import { Lojista } from "@prisma/client";
import { instanceToInstance } from "class-transformer";
import { ILojistaResponseDTO } from "../dtos/ILojistaResponseDTO";

class LojistaMap {
    static toDTO({ username }: Lojista): ILojistaResponseDTO {
        const lojista = instanceToInstance({
            username,
        });
        return lojista;
    }
}

export { LojistaMap };
