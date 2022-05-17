import { User } from "@prisma/client";
import { instanceToInstance } from "class-transformer";
import { IUserResponseDTO } from "../dtos/IUserResponseDTO";

class UserMap {
    static toDTO({ email, name, id, avatar_url }: User): IUserResponseDTO {
        const user = instanceToInstance({
            email,
            name,
            id,
            avatar_url,
        });
        return user;
    }
}

export { UserMap };
