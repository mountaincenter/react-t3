import { PrismaClient } from "@prisma/client";
import { type MealPhoto } from "@/server/types";

const prisma = new PrismaClient();

export const mealPhotoHandler = {
  async getAllMealPhotos(): Promise<MealPhoto[]> {
    return await prisma.mealPhoto.findMany();
  },
  async getMealPhoto(id: number): Promise<MealPhoto | null> {
    return await prisma.mealPhoto.findUnique({
      where: { id },
    });
  },
  async createMealPhoto(data: {
    url?: string | null;
    registeredDate: Date;
    mealType: string;
    userId: number;
    description?: string | null;
    mealCalories?: number | null;
    ratings?: number | null;
    mealTaken: boolean;
  }): Promise<MealPhoto> {
    return await prisma.mealPhoto.create({
      data,
    });
  },
  async updateMealPhoto(
    id: number,
    data: Partial<Omit<MealPhoto, "id" | "createdAt" | "updatedAt">>,
  ): Promise<MealPhoto> {
    return await prisma.mealPhoto.update({
      where: { id },
      data,
    });
  },
  async deleteMealPhoto(id: number): Promise<MealPhoto> {
    return await prisma.mealPhoto.delete({
      where: { id },
    });
  },
};
