import { api } from "@/trpc/server";
import TodoList from "@/app/_components/TodoList";
import WegithGraph from "@/app/_components/WeightGraph";
import { CreatePost } from "@/app/_components/CreatePost";
import { CreateWeight } from "@/app/_components/CreateWeight";
import { type User } from "@/app/types";
import WeightStats from "@/app/_components/WeightStats";
import WeightDiff from "@/app/_components/WeightDiff";
import WeightDashbord from "@/app/_components/WeightDashbord";

export default async function Home() {
  const posts = await api.post.getAllPosts.query();
  const user = (await api.user.getUser.query({ id: 1 })) as User;
  console.log("posts", posts);
  console.log("user", user);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-200 py-2">
      {/* <h1 className="text-4xl font-bold text-gray-700">T3 Nextjs App</h1> */}
      <div className="mt-5 w-full max-w-xl items-center justify-center">
        <div className="w-full rounded-lg bg-white px-8 py-6 shadow-md">
          {user.weight?.[0]?.bodyFat && (
            <>
              <WeightStats
                weight={user.weight[0].weight}
                bodyFat={user.weight[0].bodyFat}
                height={user.height}
              />
              <CreateWeight userId={user.id} initialWeight={user.weight[0]} />
            </>
          )}
        </div>
      </div>
      <div className="mt-5 w-full max-w-xl items-center justify-center">
        <div className="w-full rounded-lg bg-white px-8 py-6 shadow-md">
          {user.weight?.length > 1 && user.weight[0] && user.weight[1] && (
            <WeightDiff
              recentWeight={user.weight[0]}
              previousWeight={user.weight[1]}
            />
          )}
        </div>
      </div>
      <div className="mt-5 w-full max-w-xl items-center justify-center">
        <div className="w-full rounded-lg bg-white px-8 py-6 shadow-md">
          {user && (
            <>
              <WegithGraph
                weights={user.weight}
                targetWeight={user.targetWeight ?? undefined}
              />
            </>
          )}
        </div>
      </div>
      <div className="mt-5 w-full max-w-xl items-center justify-center">
        <div className="w-full rounded-lg bg-white px-8 py-6 shadow-md">
          <WeightDashbord weights={user.weight} />
        </div>
      </div>
      <div className="mt-5 w-full max-w-xl items-center justify-center">
        <div className="w-full rounded-lg bg-white px-8 py-6 shadow-md">
          <CreatePost />
          <TodoList posts={posts} />
        </div>
      </div>
    </main>
  );
}
