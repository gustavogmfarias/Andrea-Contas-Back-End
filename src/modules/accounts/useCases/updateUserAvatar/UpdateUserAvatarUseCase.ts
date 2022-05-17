import { inject, injectable } from "tsyringe";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    user_id: string;
    avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ) {}

    async execute({ user_id, avatar_file }: IRequest): Promise<void> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError("User doesn't exist");
        }

        if (user.avatar_url) {
            await this.storageProvider.delete(user.avatar_url, "avatar");
        }

        await this.storageProvider.save(avatar_file, "avatar");

        user.avatar_url = avatar_file;

        await this.usersRepository.update(user);
    }
}

export { UpdateUserAvatarUseCase };
