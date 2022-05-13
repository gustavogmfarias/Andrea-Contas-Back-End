import { User } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUsersRepository } from "../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({
        name,
        password,
        email,
        avatar_url,
        role,
    }: ICreateUserDTO): Promise<User> {
        const userAlredyExists = this.usersRepository.findByEmail(email);
    }
}
