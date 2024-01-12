import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { mealPhotoHandler } from "@/server/handlers/mealPhotoHandler";

const mealPhotoSchema = z.object({
  url: z.string(),
  registeredDate: z.date(),
  mealType: z.string(),
  userId: z.number(),
  description: z.string().nullable().optional(),
  mealCalories: z.number().nullable().optional(),
  rating: z.number().nullable().optional(),
});

export const mealPhotoRouter = createTRPCRouter({
  getAllMealPhotos: publicProcedure.query(async () => {
    return await mealPhotoHandler.getAllMealPhotos();
  }),
  getMealPhoto: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return await mealPhotoHandler.getMealPhoto(input.id);
    }),
  createMealPhoto: publicProcedure
    .input(mealPhotoSchema)
    .mutation(async ({ input }) => {
      return await mealPhotoHandler.createMealPhoto(input);
    }),

  updateMealPhoto: publicProcedure
    .input(
      z.object({
        id: z.number(),
        data: mealPhotoSchema,
      }),
    )
    .mutation(async ({ input }) => {
      return await mealPhotoHandler.updateMealPhoto(input.id, input.data);
    }),
  deleteMealPhoto: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await mealPhotoHandler.deleteMealPhoto(input.id);
    }),
});
