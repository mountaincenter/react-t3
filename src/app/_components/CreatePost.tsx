"use client";

import { useState } from "react";
import { usePostMutation } from "../_hooks/usePostMutation";
import CustomAlert from "./CustomAlert";

export function CreatePost() {
  const [content, setContent] = useState("");
  const handleCreatePostSuccess = () => {
    setContent("");
  };
  const { createPost, message } = usePostMutation(handleCreatePostSuccess);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost.mutate(
            { content },
            { onSuccess: handleCreatePostSuccess },
          );
        }}
        className="mb-4 space-y-3"
      >
        <input
          type="text"
          placeholder="Title"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded-lg border px-4 py-2 focus:border-blue-400 focus:outline-none"
        />
        <button
          type="submit"
          className="w-full transform rounded bg-blue-500 px-4 py-2 text-white duration-200 hover:scale-95 hover:bg-blue-400"
          disabled={createPost.isLoading}
        >
          {createPost.isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {message && (
        <CustomAlert
          message={message}
          type={createPost.isSuccess ? "success" : "error"}
        />
      )}
    </>
  );
}
