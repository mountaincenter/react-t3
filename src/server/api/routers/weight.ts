import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { weightHandler } from "@/server/handlers/weightHandler";

// Weight の入力バリデーションスキーマを定義
const weightSchema = z.object({
  weight: z.number(),
  bodyFat: z.number().nullable().optional(),
  measurementDate: z.date(),
  userId: z.number(),
});

export const weightRouter = createTRPCRouter({
  getAllWeights: publicProcedure.query(async () => {
    return await weightHandler.getAllWeights();
  }),

  getWeight: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return await weightHandler.getWeight(input.id);
    }),

  createWeight: publicProcedure
    .input(weightSchema)
    .mutation(async ({ input }) => {
      return await weightHandler.createWeight(input);
    }),

  updateWeight: publicProcedure
    .input(
      z.object({
        id: z.number(),
        data: weightSchema,
      }),
    )
    .mutation(async ({ input }) => {
      return await weightHandler.updateWeight(input.id, input.data);
    }),

  deleteWeight: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await weightHandler.deleteWeight(input.id);
    }),
});
