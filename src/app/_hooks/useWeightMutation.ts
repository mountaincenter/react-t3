import { useState } from "react";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

export const useWeightMutation = (onCreateWeightSuccess?: () => void) => {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const createWeight = api.weight.createWeight.useMutation({
    onSuccess: () => {
      setMessage("体重を登録しました");
      setTimeout(() => setMessage(""), 3000);
      router.refresh();
      if (onCreateWeightSuccess) {
        onCreateWeightSuccess();
      }
    },
    onError: () => {
      setMessage("体重の登録に失敗しました");
      setTimeout(() => setMessage(""), 3000);
    },
  });

  const updateWeight = api.weight.updateWeight.useMutation({
    onSuccess: () => {
      setMessage("体重を更新しました");
      setTimeout(() => setMessage(""), 3000);
      router.refresh();
      if (onCreateWeightSuccess) {
        onCreateWeightSuccess();
      }
    },
    onError: () => {
      setMessage("体重の更新に失敗しました");
      setTimeout(() => setMessage(""), 3000);
    },
  });

  const deleteWeight = api.weight.deleteWeight.useMutation({
    onSuccess: () => {
      setMessage("体重を削除しました");
      setTimeout(() => setMessage(""), 3000);
      router.refresh();
      if (onCreateWeightSuccess) {
        onCreateWeightSuccess();
      }
    },
    onError: () => {
      setMessage("体重の削除に失敗しました");
      setTimeout(() => setMessage(""), 3000);
    },
  });

  return { message, createWeight, updateWeight, deleteWeight };
};
