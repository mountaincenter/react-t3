import React from "react";
import {
  CameraIcon,
  PhotoIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";

interface RegistrationIconsProps {
  handleWebcam: (e: React.FormEvent) => void;
  handleEdit: (e: React.FormEvent) => void;
  handleNotEaten: (e: React.FormEvent) => void;
}

const RegistrationIcons: React.FC<RegistrationIconsProps> = ({
  handleWebcam,
  handleEdit,
  handleNotEaten,
}) => {
  return (
    <div className="flex items-center justify-center space-x-4">
      <CameraIcon
        className="h-7 w-7 cursor-pointer text-gray-500"
        onClick={handleWebcam}
      />
      <PhotoIcon
        className="h-7 w-7 cursor-pointer text-gray-500"
        onClick={handleEdit}
      />
      <NoSymbolIcon
        className="h-7 w-7 cursor-pointer text-gray-500"
        onClick={handleNotEaten}
      />
    </div>
  );
};

export default RegistrationIcons;
