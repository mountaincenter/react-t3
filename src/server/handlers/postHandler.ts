import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const postHandler = {
  async getAllPosts() {
    return await prisma.post.findMany();
  },
  async createPost(content: string) {
    return await prisma.post.create({
      data: {
        content,
      },
    });
  },
  async updatePost(id: number, content: string, completed: boolean) {
    return await prisma.post.update({
      where: { id },
      data: { content, completed },
    });
  },
  async deletePost(id: number) {
    return await prisma.post.delete({
      where: { id },
    });
  },
};
