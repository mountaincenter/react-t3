import { PrismaClient } from "@prisma/client";
import { type Weight } from "@/server/types";

const prisma = new PrismaClient();

export const weightHandler = {
  async getAllWeights(): Promise<Weight[]> {
    return await prisma.weight.findMany();
  },
  async getWeight(id: number): Promise<Weight | null> {
    return await prisma.weight.findUnique({
      where: { id },
    });
  },
  async createWeight(data: {
    weight: number;
    bodyFat?: number | null;
    measurementDate: Date;
    userId: number;
  }): Promise<Weight> {
    return await prisma.weight.create({
      data,
    });
  },
  async updateWeight(
    id: number,
    data: Partial<Omit<Weight, "id" | "createdAt" | "updatedAt">>,
  ): Promise<Weight> {
    return await prisma.weight.update({
      where: { id },
      data,
    });
  },
  async deleteWeight(id: number): Promise<Weight> {
    return await prisma.weight.delete({
      where: { id },
    });
  },
};
