import React from "react";
import Todo from "@/app/_components/Todo";
import type { Post } from "@/app/types";

interface TodoListProps {
  posts: Post[];
}
const TodoList = ({ posts }: TodoListProps) => {
  console.log("posts", posts);
  return (
    <>
      <ul className="space-y-3">
        {posts.map((post: Post) => (
          <Todo key={post.id} post={post} />
        ))}
      </ul>
    </>
  );
};

export default TodoList;
