/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { app } from "@shared/infra/http/app";
import request from "supertest";

describe("LOJISTA - Refresh token", () => {
    it("Deve ser capaz de gerar um novo Token a partir do refresh token", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });

        const { token, refreshToken } = responseToken.body;

        const responseRefreshToken = await request(app)
            .post("/refresh-token")
            .send({ refreshToken: refreshToken });

        expect(responseRefreshToken.status).toBe(200);
        expect(responseRefreshToken.body).toHaveProperty("refreshToken");
        expect(responseRefreshToken.body).toHaveProperty("token");
    });

    it("Não deve ser capaz de gerar um novo Token  se o Refresh Token é inválido", async () => {
        const responseRefreshToken = await request(app)
            .post("/refresh-token")
            .send({
                refreshToken:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imd1c3Rhdm8iLCJpYXQiOjE2NTkxNDQ1NTIsImV4cCI6MTY2MTczNjU1Miwic3ViIjoiZDJmZjMyNzAtYzZmYS00MTAzLTg0ZWMtZDhlZWZiMTBjOGZhIn0.JNr7eoaiE2WaaPVi4yx1T1goALCHWa5261OyyQwhA2I",
            });

        expect(responseRefreshToken.status).toBe(401);
        expect(responseRefreshToken.body.message).toBe(
            "Refresh Token doesn't Exists"
        );
    });
});
