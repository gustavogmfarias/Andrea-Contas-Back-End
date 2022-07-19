import { Conta } from "@prisma/client";
import { ICreateContasDTO } from "../dtos/ICreateContasDTO";

export interface IContasRepository {
    create(data: ICreateContasDTO): Promise<Conta>;
}
