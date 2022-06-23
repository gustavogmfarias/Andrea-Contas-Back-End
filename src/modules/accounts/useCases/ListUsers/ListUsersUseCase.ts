import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { UserMap } from "@modules/accounts/mapper/UserMap";
import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";

@injectable()
class ListUsersUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({ page, per_page }): Promise<IUserResponseDTO[]> {
        const users = await this.usersRepository.listUsers({ page, per_page });

        const usersDTO = users.map((user) => {
            return UserMap.toDTO(user);
        });
        return usersDTO;
    }
}
export { ListUsersUseCase };
