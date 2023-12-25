import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { postHandler } from "@/server/handlers/postHandler";

export const postRouter = createTRPCRouter({
  getAllPosts: publicProcedure.query(async () => {
    return await postHandler.getAllPosts();
  }),

  createPost: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      return await postHandler.createPost(input.name);
    }),

  updatePost: publicProcedure
    .input(z.object({ id: z.number(), name: z.string() }))
    .mutation(async ({ input }) => {
      return await postHandler.updatePost(input.id, input.name);
    }),

  deletePost: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await postHandler.deletePost(input.id);
    }),
});
