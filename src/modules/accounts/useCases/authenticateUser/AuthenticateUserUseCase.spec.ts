import "reflect-metadata";
import { AuthenticateUserUserCase } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserUserCase";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUserCase } from "@modules/accounts/useCases/createUser/CreateUserUserCase";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { AppError } from "@shared/errors/AppError";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

let authenticateUserUseCase: AuthenticateUserUserCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let userTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let createUserUserCase: CreateUserUserCase;
let dateProvider: DayjsDateProvider;

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        userTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();

        authenticateUserUseCase = new AuthenticateUserUserCase(
            usersRepositoryInMemory,
            userTokensRepositoryInMemory,
            dateProvider
        );
        createUserUserCase = new CreateUserUserCase(usersRepositoryInMemory);
    });

    it("should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            name: "Test User",
            password: "1234",
            email: "user@test.com",
            driver_license: "00123",
        };

        await createUserUserCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate an non existent user", async () => {
        await expect(
            authenticateUserUseCase.execute({
                email: "false@email.com",
                password: "false",
            })
        ).rejects.toEqual(new AppError("Email or password incorrect"));
    });

    it("should not be able to authenticate with incorrect password", async () => {
        const user: ICreateUserDTO = {
            name: "Test Error",
            password: "1234",
            email: "user@user.com",
            driver_license: "9999",
        };

        await createUserUserCase.execute(user);
        await expect(
            authenticateUserUseCase.execute({
                email: user.email,
                password: "incorrectPassword",
            })
        ).rejects.toEqual(new AppError("Email or password incorrect"));
    });
});
