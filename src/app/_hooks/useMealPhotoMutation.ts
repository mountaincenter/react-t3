import { useState } from "react";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

export const useMealPhotoMutation = (onCreateMealPhotoSuccess?: () => void) => {
  const router = useRouter();
  const [message, setMessage] = useState<string>("");

  const createMealPhoto = api.mealPhoto.createMealPhoto.useMutation({
    onSuccess: () => {
      setMessage("投稿が完了しました");
      setTimeout(() => setMessage(""), 3000);
      router.refresh();
      if (onCreateMealPhotoSuccess) onCreateMealPhotoSuccess();
    },
    onError: () => {
      setMessage("投稿に失敗しました");
      setTimeout(() => setMessage(""), 3000);
    },
  });

  const updateMealPhoto = api.mealPhoto.updateMealPhoto.useMutation({
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

  const deleteMealPhoto = api.mealPhoto.deleteMealPhoto.useMutation({
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

  return { message, createMealPhoto, updateMealPhoto, deleteMealPhoto };
};
