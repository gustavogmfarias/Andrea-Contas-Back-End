import { PrismaClient, Prisma } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const passwordAdmin = await hash("admin", 12);
    const passwordUser = await hash("gustavo", 12);

    const userData: Prisma.UserCreateInput[] = [
        {
            name: "Admin",
            last_name: "Administrator",
            email: "admin@admin.com",
            password: passwordAdmin,
            role: "ADMIN",
        },
        {
            name: "Gustavo",
            last_name: "Goulart",
            email: "gustavo@gmail.com",
            password: passwordUser,
            role: "USER",
        },
    ];
    console.log(`Start seeding ...`);

    // eslint-disable-next-line no-restricted-syntax
    for (const u of userData) {
        // eslint-disable-next-line no-await-in-loop
        const user = await prisma.user.create({
            data: u,
        });

        console.log(`Created user with id: ${user.id}`);
    }
    console.log(`Seeding finished.`);
}

main()
    .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
