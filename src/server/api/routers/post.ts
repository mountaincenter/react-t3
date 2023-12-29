import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { postHandler } from "@/server/handlers/postHandler";

export const postRouter = createTRPCRouter({
  getAllPosts: publicProcedure.query(async () => {
    return await postHandler.getAllPosts();
  }),

  createPost: publicProcedure
    .input(z.object({ content: z.string() }))
    .mutation(async ({ input }) => {
      return await postHandler.createPost(input.content);
    }),

  updatePost: publicProcedure
    .input(z.object({ id: z.number(), content: z.string() }))
    .mutation(async ({ input }) => {
      return await postHandler.updatePost(input.id, input.content);
    }),

  deletePost: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await postHandler.deletePost(input.id);
    }),
});
