import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    email: 'admin@hotmail.com',
    password: 'admin',
    role: 'ADMIN',
    company: {
      
    },
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
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
