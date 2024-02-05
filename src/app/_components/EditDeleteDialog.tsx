import React, { useEffect } from "react";
import type { MealPhoto } from "@/app/types";
import { useMealPhotoMutation } from "../_hooks/useMealPhotoMutation";
import CustomAlert from "./CustomAlert";

interface EditDeleteDialogProps {
  onClose: () => void;
  onEdit: () => void;
  photo: MealPhoto;
}

const EditDeleteDialog: React.FC<EditDeleteDialogProps> = ({
  onClose,
  onEdit,
  photo,
}) => {
  const { deleteMealPhoto, message } = useMealPhotoMutation();

  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      if (e.target && !(e.target as Element).closest(".menu-container")) {
        onClose();
      }
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [onClose]);

  const handleDelete = () => {
    deleteMealPhoto.mutate({ id: photo.id });
  };

  return (
    <div className="menu-container absolute z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
      <div className="py-1">
        <button
          onClick={() => onEdit()}
          className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
        >
          編集
        </button>
        <button
          onClick={handleDelete}
          className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
        >
          削除
        </button>
      </div>
      {(deleteMealPhoto.isLoading ?? message) && (
        <CustomAlert
          message={deleteMealPhoto.isLoading ? "削除中" : message}
          type={
            deleteMealPhoto.isSuccess
              ? "success"
              : deleteMealPhoto.isLoading
                ? "loading"
                : "error"
          }
        />
      )}
    </div>
  );
};

export default EditDeleteDialog;
