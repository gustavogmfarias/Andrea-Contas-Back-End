/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { app } from "@shared/infra/http/app";
import request from "supertest";

describe("LOJISTA - Update Lojista Controller", () => {
    it("Deve ser de atualizar um Lojista totalmente", async () => {
        const responseToken = await request(app)
            .post("/sessions")
            .send({ username: "admin", senha: "admin" });

        const { token } = responseToken.body;

        const responseLojistaBuscado = await request(app)
            .get("/lojistas/findbyusername")
            .set({ Authorization: `Bearer ${token}` })
            .send({ username: "gustavo" });

        console.log(responseLojistaBuscado.body);

        const responseLojistaAtualizado = await request(app)
            .get(`/lojistas/update/${responseLojistaBuscado.body.id}`)
            .set({ Authorization: `Bearer ${token}` })
            .send({ username: "mauricinho" });

        console.log(responseLojistaAtualizado.body);

        expect(responseLojistaAtualizado.status).toBe(200);
        expect(responseLojistaAtualizado.body).not.toEqual(
            responseLojistaBuscado.body
        );
        expect(responseLojistaAtualizado.body.nome).toBe("mauricinho");
    });

    // it("Deve ser capaz de atualizar um Lojista por apenas o nome", async () => {}

    // it("Não deve ser capaz de atualizar um lojista se ele não existe", async () => {}

    // it("Não deve ser capaz de atualizar um lojista se o token está inválido ou expirado", async () => {}

    // it("Não deve ser capaz de atualizar um lojista se não estiver logado", async () => {}

    // it("Deve ser capaz de atualizar apenas o username de um Lojista", async () => {}

    // it("Deve ser capaz de atualizar apenas o nome de um Lojista", async () => {}

    // it("Deve ser capaz de atualizar apenas a senha de um Lojista", async () => {}

    // it("Não deve ser capaz de atualizar a senha de  lojista se a senha e a confirmação de senha não são iguais", async () => {}
});
