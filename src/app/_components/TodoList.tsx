"use client";
import React, { useState } from "react";
import Todo from "@/app/_components/Todo";
import type { Post } from "@/app/types";

interface TodoListProps {
  posts: Post[];
}

const TodoList = ({ posts }: TodoListProps) => {
  const [hideCompleted, setHideCompleted] = useState<boolean>(false);

  const sortedPosts = posts.sort((a, b) => {
    return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
  });

  const filteredPosts = hideCompleted
    ? sortedPosts.filter((post) => !post.completed)
    : sortedPosts;

  return (
    <>
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          checked={hideCompleted}
          onChange={(e) => setHideCompleted(e.target.checked)}
          id="hide-completed"
          className="hidden"
        />
        <label
          htmlFor="hide-completed"
          className="flex cursor-pointer items-center text-sm text-gray-500"
        >
          <span
            className={`mr-2 inline-block h-5 w-5 rounded border border-gray-300 ${
              hideCompleted ? "bg-blue-500" : "bg-white"
            }`}
          ></span>
          完了したタスクを非表示
        </label>
      </div>
      <ul className="space-y-3">
        {filteredPosts.map((post: Post) => (
          <Todo key={post.id} post={post} />
        ))}
      </ul>
    </>
  );
};

export default TodoList;
