import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: "buddha.lama@imark.com.np" },
    update: {},
    create: {
      email: "buddha.lama@imark.com.np",
      firstName: "Buddha",
      middleName: " ",
      lastName: "Lama",
      role: "USER",
      password: "password",
      address: "boudha",
      updatedAt: new Date(),
      posts: {
        create: [
          {
            title: "Check out Prisma with Next.js",
            content: "https://www.prisma.io/nextjs",
            updatedAt: new Date(),
          },
        ],
      },
    },
  });

  console.log({ alice });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
