import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// const roleData: Prisma.Role.create[] = [
const roleData: Prisma.RoleCreateInput[] = [
  { roleName: "Admin" },
  { roleName: "User" },
];

const userData: Prisma.UserCreateInput[] = [
  {
    email: "admin@hotmail.com",
    password: "admin",
    // role: 'Admin',
    role: { connect: { id: 1 }},
    company: {},
  },  {
    email: "teste@hotmail.com",
    password: "teste",
    // role: 'Admin',
    role: { connect: { id: 2 }},
    company: {},
  },
  // {
  //   name: 'Nilu',
  //   email: 'normal@hotmail.com',
  //   password: 'normal',
  //   cars: {
  //     create: [
  //       {
  //         title: 'Follow Prisma on Twitter',
  //         content: 'https://www.twitter.com/prisma',
  //         published: true,
  //       },
  //     ],
  //   },
  // }
];

async function main() {
  console.log(`Start seeding ...`);

  for (const u of roleData) {
    const role = await prisma.role.create({
      data: u,
    });
    console.log(`Created Role with id: ${role.id}`);
  }

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
