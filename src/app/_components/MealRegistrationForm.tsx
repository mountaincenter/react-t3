import React, { useState, useRef, useEffect } from "react";
import type { User } from "@/app/types";
import { useMealPhotoMutation } from "../_hooks/useMealPhotoMutation";
import RatingComponent from "./RatingComponent";
import CustomAlert from "./CustomAlert";
import ImageUploader from "./ImageUploader";
import WebcamComponent from "./WebcamComponent";
import useImageHandler from "../_hooks/useImageHandler";
import RegistRationIcons from "./RegistrationIcons";
import MealDescriptionForm from "./MealDescriptionForm";
import ActionButtons from "./ActionButtons";
import useSaveMeal from "../_hooks/useSaveMeal";

interface MealRegistrationFormProps {
  selectedMeal: string;
  selectedDay: Date;
  user: User;
}

const MealRegistrationForm: React.FC<MealRegistrationFormProps> = ({
  selectedMeal,
  selectedDay,
  user,
}) => {
  const [ratings, setRatings] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [showWebcam, setShowWebcam] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { createMealPhoto, message } = useMealPhotoMutation();
  const { handleSave, handleNotEaten } = useSaveMeal(user);
  const {
    selectedFile,
    capturedImage,
    handleFileChange,
    handleImageCaptured,
    isEditing,
    setIsEditing,
    setSelectedFile,
    setCapturedImage,
  } = useImageHandler();

  const handleEdit = () => {
    fileInputRef.current?.click();
  };

  const handleWebcam = () => {
    setShowWebcam(true);
    setIsEditing(true);
  };

  const handleCancel = async () => {
    setIsEditing(false);
    setShowWebcam(false);
    setSelectedFile(null);
    setCapturedImage(null);
    setRatings(0);
    setDescription("");
  };

  const onMealSaved = async () => {
    const isSaved = await handleSave(
      selectedMeal,
      selectedDay,
      ratings,
      description,
      { selectedFile, capturedImage },
    );
    if (isSaved) {
      setIsEditing(false);
      setRatings(0);
      setDescription("");
      setShowWebcam(false);
      setSelectedFile(null);
      setCapturedImage(null);
    }
  };

  const onSaveClick = async (e: React.FormEvent) => {
    e.preventDefault();
    await onMealSaved();
  };

  const onNotEatenClick = async (e: React.FormEvent) => {
    e.preventDefault();
    handleNotEaten(selectedMeal, selectedDay);
  };

  useEffect(() => {
    console.log("message", message);
  }, [message]);

  return (
    <>
      <div className="flex w-full flex-col justify-between space-y-8 p-6">
        <div className="h-full w-full rounded-t-md object-cover object-center">
          <div className="items-between flex items-center">
            {!isEditing && (
              <>
                <RegistRationIcons
                  handleWebcam={handleWebcam}
                  handleEdit={handleEdit}
                  handleNotEaten={onNotEatenClick}
                />
              </>
            )}
          </div>
          {selectedFile && <ImageUploader file={selectedFile} />}
          {showWebcam && (
            <WebcamComponent
              onImageCaptured={handleImageCaptured}
              handleCancel={handleCancel}
            />
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        <div className="w-full space-y-2">
          {isEditing ? (
            <MealDescriptionForm
              ratings={ratings}
              setRatings={setRatings}
              description={description}
              setDescription={setDescription}
            />
          ) : (
            <>
              <RatingComponent initialRatings={ratings} readOnly={true} />
              <p className="text-gray-500">食事の登録がありません</p>
            </>
          )}
          {isEditing && (
            <ActionButtons
              onSaveClick={onSaveClick}
              onCancelClick={handleCancel}
            />
          )}
        </div>
      </div>
      {message && (
        <CustomAlert
          message={createMealPhoto.isLoading ? "登録中です" : message}
          type={
            createMealPhoto.isSuccess
              ? "success"
              : createMealPhoto.isLoading
                ? "loading"
                : "error"
          }
        />
      )}
    </>
  );
};

export default MealRegistrationForm;
