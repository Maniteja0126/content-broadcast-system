import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const exists = await prisma.user.findUnique({
        where : {email : "principal@school.com"}
    });

    if(exists) return;

    const hash = await bcrypt.hash("password123" , 10);

    await prisma.user.create({
        data : {
            name : "Principal",
            email : "principal@school.com",
            passwordHash : hash,
            role : "principal"
        }
    });

    console.log("Principal seeded")
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })