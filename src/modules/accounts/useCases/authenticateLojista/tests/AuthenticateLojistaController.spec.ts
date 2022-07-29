/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { AppError } from "@shared/errors/AppError";
import { app } from "@shared/infra/http/app";
import request from "supertest";

describe("Authenticate Lojista Controller", () => {
    it("Should be able to authenticate an user", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });

        expect(responseToken.body).toHaveProperty("token");
        expect(responseToken.body).toHaveProperty("refresh_token");
    });

    it("Should not be able to authenticate an inexistent user", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "testedeusuario", senha: "testedeusuario" });

        expect(responseToken.body.message).toBe("Email or password incorrect");
    });

    it("Should not be able to authenticate if password doesn't match", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "amin1" });

        expect(responseToken.body.message).toBe("Email or password incorrect");
    });
});
