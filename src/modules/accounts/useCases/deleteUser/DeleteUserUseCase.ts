import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class DeleteUserUseCase {
    constructor(
        @inject("UsersRepository") private usersRepository: IUsersRepository
    ) {}

    async execute(id: string): Promise<void> {
        const user = this.usersRepository.findById(id);

        if (!user) {
            throw new AppError("User doesn't exists", 404);
        }

        this.usersRepository.delete(id);
    }
}

export { DeleteUserUseCase };
