import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const allUsers = await prisma.user.findMany({
    include: { weights: true },
  });
  console.log("allUsers", allUsers);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

async function postMain() {
  const allPosts = await prisma.post.findMany();
  console.log("allPosts", allPosts);
}

postMain()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

async function weightMain() {
  const allWeights = await prisma.weight.findMany({
    include: { user: true },
  });
  console.log("allWeights", allWeights);
}

weightMain()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
