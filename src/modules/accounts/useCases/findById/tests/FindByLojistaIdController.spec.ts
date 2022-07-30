/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { app } from "@shared/infra/http/app";
import request from "supertest";

describe("LOJISTA - Find by Lojista Id Controller", () => {
    it("Deve ser capaz de buscar um lolista por id", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });
        const { token } = responseToken.body;

        const responsePorUserName = await request(app)
            .get(`/lojistas/findbyusername`)
            .send({ username: "admin" })
            .set({ Authorization: `Bearer ${token}` });

        const { id: usernameId } = responsePorUserName.body;

        const responsePorId = await request(app)
            .get(`/lojistas/findbyid/${usernameId}`)
            .set({ Authorization: `Bearer ${token}` });

        expect(responsePorId.status).toBe(200);
        expect(responsePorId.body.id).toBe(responsePorUserName.body.id);
    });

    it("Não deve ser capaz de buscar o logista por id se não estiver logado", async () => {
        const response = await request(app).get(`/lojistas/findbyid/1111`);

        expect(response.body.message).toBe("Token missing");
    });

    it("Não deve ser capaz de achar o lojista por id se o token estiver inválido ou expirado", async () => {
        const response = await request(app)
            .get(`/lojistas/findbyid/111`)
            .set({ Authorization: `Bearer 111` });

        expect(response.body.message).toBe("Invalid Token");
    });
});
