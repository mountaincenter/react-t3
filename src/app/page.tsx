import { api } from "@/trpc/server";
import TodoList from "@/app/_components/TodoList";
import WegithGraph from "@/app/_components/WeightGraph";
import { CreatePost } from "@/app/_components/CreatePost";
import { type User } from "@/app/types";

export default async function Home() {
  const posts = await api.post.getAllPosts.query();
  const user = (await api.user.getUser.query({ id: 1 })) as User;
  console.log("posts", posts);
  console.log("user", user);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-200 py-2">
      <h1 className="-mt-32 text-4xl font-bold text-gray-700">T3 Nextjs App</h1>
      <h1 className="mt-4 text-2xl font-bold text-gray-700">{user?.name}</h1>
      <div className="mt-5 w-full max-w-xl items-center justify-center">
        <div className="w-full rounded-lg bg-white px-8 py-6 shadow-md">
          {user && (
            <WegithGraph
              weights={user.weight}
              targetWeight={user.targetWeight ?? undefined}
            />
          )}
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
