import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.mealPhoto.delete({
    where: { id: 5 },
  });
  const allMealPhoto = await prisma.mealPhoto.findMany();
  console.log("allMealPhoto", allMealPhoto);
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
