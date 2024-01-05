"use client";
import type { Post } from "@/app/types";
import React, { useState, useRef, useEffect } from "react";
import { usePostMutation } from "../_hooks/usePostMutation";
import CustomAlert from "./CustomAlert";

import { formatDistance } from "date-fns";
import { ja } from "date-fns/locale";

interface TodoProps {
  post: Post;
}

const Todo = ({ post }: TodoProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editContent, setEditContent] = useState<string>(post.content);
  const [editCompleted, setEditCompleted] = useState<boolean>(post.completed);
  const { message, updatePost, deletePost } = usePostMutation();
  console.log("post", post);

  const handleEdit = async () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    updatePost.mutate({
      id: post.id,
      content: editContent,
      completed: editCompleted,
    });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    deletePost.mutate({ id: post.id });
  };

  const handleToggleCompleted = async () => {
    if (!isEditing) {
      setEditCompleted(!post.completed);
      updatePost.mutate({
        id: post.id,
        content: post.content,
        completed: !post.completed,
      });
    }
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const createdAt = formatDistance(new Date(post.createdAt), new Date(), {
    addSuffix: true,
    locale: ja,
  });

  const borderClass = post.completed ? "border-red-500" : "border-blue-500";
  const contentClass = post.completed
    ? "line-through text-gray-500"
    : "text-gray-700";

  return (
    <li
      key={post.id}
      className={`flex justify-between rounded border-l-4 ${borderClass} bg-white p-3 shadow`}
    >
      <div
        className="flex cursor-pointer items-center space-x-2"
        onClick={handleToggleCompleted}
      >
        {isEditing ? (
          <input
            ref={inputRef}
            value={editContent}
            onChange={(e) => {
              setEditContent(e.target.value);
            }}
            className="mr-2 rounded border border-gray-400 px-2 py-1"
          />
        ) : (
          <span className={contentClass}>{post.content}</span>
        )}
        <span className="text-sm text-gray-500">{createdAt}</span>
      </div>
      <div>
        {isEditing ? (
          <button className="mr-3 text-blue-500" onClick={handleSave}>
            save
          </button>
        ) : (
          <button className="mr-3 text-green-500" onClick={handleEdit}>
            edit
          </button>
        )}
        <button className="text-red-500" onClick={handleDelete}>
          delete
        </button>
      </div>
      {message && (
        <CustomAlert
          message={message}
          type={updatePost.isSuccess ? "success" : "error"}
        />
      )}
    </li>
  );
};

export default Todo;
