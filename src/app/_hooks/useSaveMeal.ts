import { useMealPhotoMutation } from "./useMealPhotoMutation";
import { supabase } from "../_utils/supabaseClient";
import { generateTimestamp } from "../_utils/utils";
import type { User, MealPhoto } from "@/app/types";

interface ImageInfo {
  selectedFile: File | null;
  capturedImage: string | null;
}

const useSaveMeal = (user?: User) => {
  const { createMealPhoto, updateMealPhoto } = useMealPhotoMutation();

  const uploadImage = async (file: File | Blob, fileName: string) => {
    const filePath = `public/${fileName}`;
    const { error, data } = await supabase.storage
      .from("mealPhoto")
      .upload(filePath, file);
    if (error) throw error;

    return data?.path || "";
  };

  const handleSave = async (
    selectedMeal: string,
    selectedDay: Date,
    ratings: number,
    description: string,
    imageInfo: ImageInfo,
  ) => {
    if (!user) return;
    let imageUrl = "";

    if (imageInfo.selectedFile) {
      const timestamp = generateTimestamp();
      const fileExt = imageInfo.selectedFile.name.split(".").pop();
      const fileName = `${timestamp}.${fileExt}`;
      await uploadImage(imageInfo.selectedFile, fileName);

      const { data } = supabase.storage
        .from("mealPhoto")
        .getPublicUrl(`public/${fileName}`);
      imageUrl = data.publicUrl;
    } else if (imageInfo.capturedImage) {
      const response = await fetch(imageInfo.capturedImage);
      const blob = await response.blob();
      const timestamp = generateTimestamp();
      const fileName = `${timestamp}.jpg`;
      await uploadImage(blob, fileName);

      const { data } = supabase.storage
        .from("mealPhoto")
        .getPublicUrl(`public/${fileName}`);
      imageUrl = data.publicUrl;
    }

    if (imageUrl) {
      createMealPhoto.mutate({
        url: imageUrl,
        userId: user.id,
        mealType: selectedMeal,
        registeredDate: selectedDay,
        mealTaken: true,
        ratings,
        description,
      });
      return true;
    }
    return false;
  };

  const handleUpdate = async (
    photoId: number,
    updatedData: {
      userId: number;
      registeredDate: Date;
      mealType: string;
      mealTaken: boolean;
      url?: string | null;
      description?: string | null;
      mealCalories?: number | null;
      ratings?: number | null;
    },
    imageInfo: ImageInfo,
  ) => {
    let newImageUrl = updatedData.url;

    if (imageInfo.selectedFile) {
      const timestamp = generateTimestamp();
      const fileExt = imageInfo.selectedFile.name.split(".").pop();
      const fileName = `${timestamp}.${fileExt}`;
      await uploadImage(imageInfo.selectedFile, fileName);
      const { data } = supabase.storage
        .from("mealPhoto")
        .getPublicUrl(`public/${fileName}`);
      newImageUrl = data?.publicUrl;
    } else if (imageInfo.capturedImage) {
      const response = await fetch(imageInfo.capturedImage);
      const blob = await response.blob();
      const timestamp = generateTimestamp();
      const fileName = `${timestamp}.jpg`;
      await uploadImage(blob, fileName);
      const { data } = supabase.storage
        .from("mealPhoto")
        .getPublicUrl(`public/${fileName}`);
      newImageUrl = data?.publicUrl;
    }

    const updatedMealData = {
      ...updatedData,
      url: newImageUrl,
    };
    try {
      const updatedPhoto = await updateMealPhoto.mutateAsync({
        id: photoId,
        data: updatedMealData,
      });
      return updatedPhoto;
    } catch (error) {
      console.error("Error updating meal photo:", error);
      throw error;
    }
  };

  const handleNotEaten = (
    selectedMeal: string,
    selectedDay: Date,
    mealPhoto?: MealPhoto,
  ) => {
    if (!user) return;
    if (mealPhoto) {
      updateMealPhoto.mutate({
        id: mealPhoto.id,
        data: {
          userId: user.id,
          mealType: mealPhoto.mealType,
          registeredDate: mealPhoto.registeredDate,
          mealTaken: false,
          url: null,
          ratings: 0,
          description: null,
        },
      });
    } else {
      createMealPhoto.mutate({
        userId: user.id,
        mealType: selectedMeal,
        registeredDate: selectedDay,
        url: null,
        ratings: 0,
        description: null,
        mealTaken: false,
      });
    }
  };
  return { handleSave, handleNotEaten, handleUpdate };
};

export default useSaveMeal;
