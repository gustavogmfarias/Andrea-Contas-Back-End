import { Log } from "@prisma/client";
import { ILogCreateDTO } from "./dtos/ILogCreateDTO";

export interface ILogProvider {
    create(data: ILogCreateDTO): Promise<Log>;
    findById(id: string): Promise<Log>;
    existeAlgum(): Promise<Log>;
}
