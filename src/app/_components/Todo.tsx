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
  const { message, updatePost, deletePost } = usePostMutation();

  const handleEdit = async () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    updatePost.mutate({ id: post.id, content: editContent });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    deletePost.mutate({ id: post.id });
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

  return (
    <li
      key={post.id}
      className="flex justify-between rounded border-l-4 border-blue-500 bg-white p-4 shadow"
    >
      <div className="flex items-center space-x-2">
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
          <span className="text-gray-700">{post.content}</span>
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
