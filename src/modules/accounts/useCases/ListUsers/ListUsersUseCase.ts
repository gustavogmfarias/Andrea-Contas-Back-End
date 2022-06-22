import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { UserMap } from "@modules/accounts/mapper/UserMap";
import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import pagination from "@config/pagination/pagination";

interface IRequest {
    page?: number;
    per_page?: number;
}

@injectable()
class ListUsersUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({ page, per_page }: IRequest): Promise<IUserResponseDTO[]> {
        let users;

        if (page && per_page) {
            users = await pagination({ page, per_page });
            console.log(users.number_pages);
        } else {
            users = await this.usersRepository.listUsers();
        }

        const usersDTO = users.map((user) => {
            return UserMap.toDTO(user);
        });
        return usersDTO;
    }
}
export { ListUsersUseCase };
