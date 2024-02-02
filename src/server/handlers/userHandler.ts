import { PrismaClient } from "@prisma/client";
import { type User } from "@/server/types";

const prisma = new PrismaClient();

export const userHandler = {
  async getUser(id: number): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        weights: { orderBy: { measurementDate: "desc" } },
        mealPhotos: true,
      },
    });
  },
  async createUser(data: {
    name?: string | null;
    nickname?: string | null;
    height: number;
    age?: number | null;
    gender?: string | null;
    targetWeight?: number | null;
  }): Promise<User> {
    return await prisma.user.create({
      data,
    });
  },
  async updateUser(
    id: number,
    data: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>,
  ): Promise<User> {
    return await prisma.user.update({
      where: { id },
      data,
    });
  },
  async deleteUser(id: number): Promise<User> {
    return await prisma.user.delete({
      where: { id },
    });
  },
};
