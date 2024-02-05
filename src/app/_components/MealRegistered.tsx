import React, { useState, useRef } from "react";
import Image from "next/image";
import type { MealPhoto, User } from "@/app/types";
import RatingComponent from "./RatingComponent";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { supabase } from "../_utils/supabaseClient";
import EditDeleteDialog from "./EditDeleteDialog";
import ImageUploader from "./ImageUploader";
import RegistrationIcons from "./RegistrationIcons";
import WebcamComponent from "./WebcamComponent";
import MealDescriptionForm from "./MealDescriptionForm";
import useImageHandler from "../_hooks/useImageHandler";
import ActionButtons from "./ActionButtons";
import useSaveMeal from "../_hooks/useSaveMeal";

interface MealCardProps {
  photo: MealPhoto;
  user: User;
}

const MealRegistered: React.FC<MealCardProps> = ({ photo, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showWebcam, setShowWebcam] = useState<boolean>(false);
  const [ratings, setRatings] = useState<number>(photo.ratings ?? 0);
  const [description, setDescription] = useState<string>(
    photo.description ?? "",
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    selectedFile,
    capturedImage,
    handleFileChange,
    handleImageCaptured,
    setSelectedFile,
    setCapturedImage,
  } = useImageHandler();
  const { handleUpdate, handleNotEaten } = useSaveMeal(user);

  const { data } = supabase.storage
    .from("mealPhoto")
    .getPublicUrl("text_mu.png");

  const notEatenImage = data.publicUrl;

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsEditing(false);
    setIsSelecting(false);
  };

  const handleEdit = () => {
    setIsOpen(false);
    setIsEditing(true);
  };

  const handleEditFile = () => {
    fileInputRef.current?.click();
    setIsSelecting(true);
  };

  const handleWebcam = () => {
    setShowWebcam(true);
    setIsSelecting(true);
  };

  const onMealUpdate = async () => {
    const updatedData = {
      userId: photo.userId,
      mealType: photo.mealType,
      registeredDate: photo.registeredDate,
      mealTaken: true,
      url: selectedFile ?? capturedImage ? undefined : photo.url, // ここを適切に設定
      description,
      ratings,
    };

    const imageInfo = {
      selectedFile,
      capturedImage,
    };

    await handleUpdate(photo.id, updatedData, imageInfo);

    setIsEditing(false);
    setIsSelecting(false);
    setSelectedFile(null);
    setCapturedImage(null);
  };

  const onMealUpdateClick = async (e: React.FormEvent) => {
    e.preventDefault();
    await onMealUpdate();
    setIsEditing(false);
    setIsSelecting(false);
    setShowWebcam(false);
  };

  const handleCancel = async () => {
    setIsEditing(false);
    setIsSelecting(false);
    setShowWebcam(false);
    setCapturedImage(null);
    setSelectedFile(null);
  };

  const onNotEatenClick = async (e: React.FormEvent) => {
    e.preventDefault();
    handleNotEaten(photo.mealType, photo.registeredDate, photo);
    setIsEditing(false);
    setIsSelecting(false);
  };

  return (
    <div className="w-full rounded-md shadow-md">
      {isEditing ? (
        <>
          {!isSelecting && (
            <RegistrationIcons
              handleWebcam={handleWebcam}
              handleEdit={handleEditFile}
              handleNotEaten={onNotEatenClick}
            />
          )}
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
        </>
      ) : (
        <Image
          src={photo.mealTaken && photo.url ? photo.url : notEatenImage}
          alt=""
          width={72}
          height={72}
          className="h-full w-full rounded-t-md object-cover object-center"
          unoptimized
        />
      )}
      <div className="flex flex-col justify-between space-y-8 p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            {isEditing ? (
              <MealDescriptionForm
                ratings={ratings}
                description={description}
                setRatings={setRatings}
                setDescription={setDescription}
              />
            ) : (
              <>
                <RatingComponent
                  initialRatings={photo.ratings ?? 0}
                  readOnly={true}
                />
                <p className="text-gray-500">
                  {photo.mealTaken
                    ? photo.description
                    : "ご飯は食べませんでした"}
                </p>
              </>
            )}
            {isEditing && (
              <ActionButtons
                onSaveClick={onMealUpdateClick}
                onCancelClick={handleCancel}
              />
            )}
          </div>
          <div className="relative">
            {!isEditing && (
              <EllipsisVerticalIcon
                className="h-6 w-6 cursor-pointer rounded-full text-gray-800"
                onClick={toggleOpen}
              />
            )}
            {isOpen && (
              <EditDeleteDialog
                onClose={handleClose}
                onEdit={handleEdit}
                photo={photo}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealRegistered;
