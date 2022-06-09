import { IUpdateUserDTO } from "@modules/accounts/dtos/IUpdateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { User } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import { injectable, inject } from "tsyringe";

@injectable()
class UpdateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({
        id,
        name,
        last_name,
        email,
        role,
        password,
        old_password,
        confirm_password,
    }: IUpdateUserDTO): Promise<User> {
        const user = await this.usersRepository.findById(id);
        let passwordHash;

        if (!user) {
            throw new AppError("User doesn't exist", 404);
        }

        if (name) {
            user.name = name;
        }

        if (last_name) {
            user.last_name = last_name;
        }

        if (email) {
            user.email = email;
        }

        if (role) {
            user.role = role;
        }

        if (old_password) {
            const passwordMatch = await compare(old_password, user.password);

            if (!passwordMatch) {
                throw new AppError("Last Password doesn't match", 401);
            }
        }

        if (password) {
            const new_password =
                password === confirm_password
                    ? password
                    : () => {
                          throw new AppError("Passwords don't match", 401);
                      };

            passwordHash = await hash(password, 12);
        }

        this.usersRepository.update({
            id,
            name,
            last_name,
            password: passwordHash,
            email,
            role,
        });

        return user;
    }
}

export { UpdateUserUseCase };
