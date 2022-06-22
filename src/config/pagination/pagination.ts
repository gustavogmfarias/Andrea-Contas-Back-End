/* eslint-disable no-await-in-loop */
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { User } from "@prisma/client";
import { prisma } from "@shared/database/prismaClient";
import { inject, injectable } from "tsyringe";

interface IRequest {
    page?: number;
    per_page?: number;
}

export default async function pagination({ page, per_page }: IRequest) {
    let exist = true;
    const number_pages = (await prisma.user.count()) / per_page;
    while (exist) {
        const result = await prisma.user.findMany({
            take: per_page,
            skip: (page - 1) * per_page,
        });

        if (result.length <= 0) {
            exist = false;
        }

        console.log(result);
        console.log("---------");
    }
}
