"use client";
import type { Post } from "@/app/types";
import React, { useState, useRef, useEffect } from "react";
import { usePostMutation } from "../_hooks/usePostMutation";
import CustomAlert from "./CustomAlert";

interface TodoProps {
  post: Post;
}

const Todo = ({ post }: TodoProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>(post.name);
  const { message, updatePost, deletePost } = usePostMutation();

  const handleEdit = async () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    updatePost.mutate({ id: post.id, name: editName });
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

  return (
    <li
      key={post.id}
      className="flex justify-between rounded border-l-4 border-blue-500 bg-white p-4 shadow"
    >
      {isEditing ? (
        <input
          ref={inputRef}
          value={editName}
          onChange={(e) => {
            setEditName(e.target.value);
          }}
          className="mr-2 rounded border border-gray-400 px-2 py-1"
        />
      ) : (
        <span className="text-gray-700">{post.name}</span>
      )}
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
