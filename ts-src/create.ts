import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.mealPhoto.create({
    data: {
      url: "https://yulutthovtswcrtevzcq.supabase.co/storage/v1/object/public/mealPhoto/Moby-logo.png",
      registeredDate: new Date("2024-01-21"),
      mealType: "breakfast",
      description: "test upload file from supabase 画像のテストです",
      ratings: 3,
      userId: 1,
    },
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
