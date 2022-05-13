import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
    {
        name: "Admin",
        email: "admin@admin.com",
        password: "admin",
        role: "ADMIN",
    },
    {
        name: "Gustavo",
        email: "gustavo@gmail.com",
        password: "gustavo",
        role: "USER",
    },
];

async function main() {
    console.log(`Start seeding ...`);

    for (const u of userData) {
        const user = await prisma.user.create({
            data: u,
        });

        console.log(`Created user with id: ${user.id}`);
    }
    console.log(`Seeding finished.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
