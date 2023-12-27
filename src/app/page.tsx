import { api } from "@/trpc/server";
import TodoList from "@/app/_components/TodoList";
import Graph from "@/app/_components/Graph";
import { CreatePost } from "@/app/_components/CreatePost";

export default async function Home() {
  const posts = await api.post.getAllPosts.query();
  console.log("posts", posts);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-200 py-2">
      <h1 className="-mt-32 text-4xl font-bold text-gray-700">
        T3 Nextjs Todo App
      </h1>
      <div className="mt-5 w-full max-w-xl items-center justify-center">
        <div className="w-full rounded-lg bg-white px-8 py-6 shadow-md">
          <Graph />
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
