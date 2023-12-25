import { useState } from "react";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

export const usePostMutation = (onCreatePostSuccess?: () => void) => {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const createPost = api.post.createPost.useMutation({
    onSuccess: () => {
      setMessage("投稿が完了しました");
      setTimeout(() => setMessage(""), 3000);
      router.refresh();
      if (onCreatePostSuccess) onCreatePostSuccess();
    },
    onError: () => {
      setMessage("投稿に失敗しました");
      setTimeout(() => setMessage(""), 3000);
    },
  });

  const updatePost = api.post.updatePost.useMutation({
    onSuccess: () => {
      setMessage("更新が完了しました");
      setTimeout(() => setMessage(""), 3000);
      router.refresh();
    },
    onError: () => {
      setMessage("更新に失敗しました");
      setTimeout(() => setMessage(""), 3000);
    },
  });

  const deletePost = api.post.deletePost.useMutation({
    onSuccess: () => {
      setMessage("削除が完了しました");
      setTimeout(() => setMessage(""), 3000);
      router.refresh();
    },
    onError: () => {
      setMessage("削除に失敗しました");
      setTimeout(() => setMessage(""), 3000);
    },
  });

  return { message, createPost, updatePost, deletePost };
};
