"use client";

import React, { useState, useRef } from "react";
import ImageUploader from "./ImageUploader";
import WebcamComponent from "./WebcamComponent";

const ImageCapture = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showWebcam, setShowWebcam] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelectClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const resetFileSelection = () => {
    setSelectedFile(null);
  };

  const toggleWebcam = () => {
    setShowWebcam(!showWebcam);
  };

  return (
    <div className="flex flex-col items-center ">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
      />
      <button
        onClick={handleFileSelectClick}
        className="mb-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        ファイルを選択
      </button>
      <button
        onClick={toggleWebcam}
        className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
      >
        カメラで撮影
      </button>
      {selectedFile && (
        <ImageUploader file={selectedFile} onReset={resetFileSelection} />
      )}
      {showWebcam && (
        <WebcamComponent
          isCameraActive={showWebcam}
          setIsCameraActive={setShowWebcam}
        />
      )}
    </div>
  );
};

export default ImageCapture;
