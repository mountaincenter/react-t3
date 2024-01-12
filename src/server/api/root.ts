import { postRouter } from "@/server/api/routers/post";
import { userRouter } from "@/server/api/routers/user";
import { weightRouter } from "@/server/api/routers/weight";
import { mealPhotoRouter } from "@/server/api/routers/mealPhoto";
import { createTRPCRouter } from "@/server/api/trpc";
import { createNextRouteHandler } from "uploadthing/next";
import { OurFileRouter } from "@/server/api/routers/imageUploader";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  user: userRouter,
  weight: weightRouter,
  mealPhoto: mealPhotoRouter,
});

export const { GET, POST } = createNextRouteHandler({
  router: OurFileRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
