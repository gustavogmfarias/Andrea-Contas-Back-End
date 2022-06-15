import { IUpdateUserDTO } from "@modules/accounts/dtos/IUpdateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { User } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

@injectable()
class ChangeOwnPasswordUseCase {
    constructor(
        @inject("UsersRepository") private usersRepository: IUsersRepository
    ) {}

    async execute({
        id,
        password,
        old_password,
        confirm_password,
    }: IUpdateUserDTO): Promise<User> {
        const user = await this.usersRepository.findById(id);
        let passwordHash;

        if (old_password) {
            const passwordMatch = await compare(old_password, user.password);

            if (!passwordMatch) {
                throw new AppError("Last Password doesn't match", 401);
            }
        }

        if (password === confirm_password) {
            passwordHash = await hash(password, 12);
        } else {
            throw new AppError("Passwords don't match", 401);
        }

        this.usersRepository.update({
            id,
            password: passwordHash,
        });

        return user;
    }
}

export { ChangeOwnPasswordUseCase };
