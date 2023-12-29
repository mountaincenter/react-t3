import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.weight.create({
    data: {
      weight: 91.7,
      bodyFat: 34.88,
      measurementDate: new Date("2023-12-28"),
      userId: 1,
    },
  });
  const allWeights = await prisma.weight.findMany();
  console.log("allWeights", allWeights);
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
