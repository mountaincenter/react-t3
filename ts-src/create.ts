import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.mealPhoto.create({
    data: {
      url: "https://example.com",
      registeredDate: new Date("2024-01-08"),
      mealType: "breakfast",
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
