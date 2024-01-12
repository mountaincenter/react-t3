-- CreateTable
CREATE TABLE "MealPhoto" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "registeredDate" TIMESTAMP(3) NOT NULL,
    "url" TEXT NOT NULL,
    "mealType" TEXT NOT NULL,
    "description" TEXT,
    "mealCalorie" DOUBLE PRECISION,
    "ratings" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MealPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealTag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MealTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MealPhotoToMealTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MealPhotoToMealTag_AB_unique" ON "_MealPhotoToMealTag"("A", "B");

-- CreateIndex
CREATE INDEX "_MealPhotoToMealTag_B_index" ON "_MealPhotoToMealTag"("B");

-- AddForeignKey
ALTER TABLE "MealPhoto" ADD CONSTRAINT "MealPhoto_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MealPhotoToMealTag" ADD CONSTRAINT "_MealPhotoToMealTag_A_fkey" FOREIGN KEY ("A") REFERENCES "MealPhoto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MealPhotoToMealTag" ADD CONSTRAINT "_MealPhotoToMealTag_B_fkey" FOREIGN KEY ("B") REFERENCES "MealTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
