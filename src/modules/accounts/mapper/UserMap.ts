import { User } from "@prisma/client";
import { instanceToInstance } from "class-transformer";
import { IUserResponseDTO } from "../dtos/IUserResponseDTO";

class UserMap {
    static toDTO({
        email,
        name,
        last_name,
        id,
        avatar_url,
        role,
    }: User): IUserResponseDTO {
        const user = instanceToInstance({
            email,
            name,
            last_name,
            id,
            avatar_url,
            role,
        });
        return user;
    }
}

export { UserMap };
