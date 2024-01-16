"use client";
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { supabase } from "@/app/_utils/supabaseClient";
import Image from "next/image";

interface WebcamComponentProps {
  setIsCameraActive: (isActive: boolean) => void;
}

const WebcamComponent = ({ setIsCameraActive }: WebcamComponentProps) => {
  const webcamRef = useRef<Webcam>(null);
  const [image, setImage] = useState<string | null>(null);
  const [isCameraReady, setIsCameraReady] = useState<boolean>(true);

  const videoConstraints = {
    facingMode: "environment",
  };

  const captureImage = async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImage(imageSrc);
      setIsCameraReady(false);
    }
  };

  const saveImage = async () => {
    if (image) {
      setImage(image);

      const response = await fetch(image);
      const blob = await response.blob();

      const now = new Date();
      const timestamp = now.toISOString().replace(/[-:T]/g, "").slice(0, 14);

      const fileExt = "jpg";
      const fileName = `${timestamp}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error } = await supabase.storage
        .from("mealPhoto")
        .upload(filePath, blob);
      if (error) {
        console.error("Error uploading file ", error);
      } else {
        alert("File uploaded successfully!");
        setImage(null);
        setIsCameraActive(false);
      }
    }
  };

  const discardImage = () => {
    setImage(null);
    setIsCameraActive(false);
  };

  return (
    <div className="container mx-auto p-4">
      {isCameraReady && (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            videoConstraints={videoConstraints}
            className="mb-4"
          />
          <button
            onClick={captureImage}
            className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Capture
          </button>
        </>
      )}
      {image && (
        <>
          <div className="mt-4">
            <Image
              src={image}
              alt="Captured"
              width={200}
              height={200}
              unoptimized
            />
          </div>
          <button
            onClick={saveImage}
            className="mt-4 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
          >
            保存
          </button>
          <button
            onClick={discardImage}
            className="ml-4 mt-4 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          >
            削除
          </button>
        </>
      )}
    </div>
  );
};

export default WebcamComponent;
