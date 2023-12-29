import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { userHandler } from "@/server/handlers/userHandler";

// User の入力バリデーションスキーマを定義
const userSchema = z.object({
  name: z.string().nullable().optional(),
  nickname: z.string().nullable().optional(),
  height: z.number(),
  age: z.number().nullable().optional(),
  gender: z.string().nullable().optional(),
  targetWeight: z.number().nullable().optional(),
});

export const userRouter = createTRPCRouter({
  getAllUsers: publicProcedure.query(async () => {
    return await userHandler.getAllUsers();
  }),
  getUser: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return await userHandler.getUser(input.id);
    }),
  createUser: publicProcedure.input(userSchema).mutation(async ({ input }) => {
    return await userHandler.createUser(input);
  }),
  updateUser: publicProcedure
    .input(
      z.object({
        id: z.number(),
        data: userSchema,
      }),
    )
    .mutation(async ({ input }) => {
      return await userHandler.updateUser(input.id, input.data);
    }),
  deleteUser: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await userHandler.deleteUser(input.id);
    }),
});
