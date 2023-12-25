import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const postHandler = {
  async getAllPosts() {
    return await prisma.post.findMany();
  },
  async createPost(name: string) {
    return await prisma.post.create({
      data: {
        name,
      },
    });
  },
  async updatePost(id: number, name: string) {
    return await prisma.post.update({
      where: { id },
      data: { name },
    });
  },
  async deletePost(id: number) {
    return await prisma.post.delete({
      where: { id },
    });
  },
};
