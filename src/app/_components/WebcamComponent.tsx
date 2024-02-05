"use client";
import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import ActionButtons from "./ActionButtons";

interface WebcamComponentProps {
  onImageCaptured: (image: string) => void;
  handleCancel: () => void;
}

const WebcamComponent: React.FC<WebcamComponentProps> = ({
  onImageCaptured,
  handleCancel,
}) => {
  const webcamRef = useRef<Webcam>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(true);

  const videoConstraints = {
    facingMode: "environment",
  };

  const captureImage = async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImageSrc(imageSrc);
      onImageCaptured(imageSrc);
      setCameraActive(false);
    }
  };

  useEffect(() => {
    if (imageSrc) {
      onImageCaptured(imageSrc);
    }
  }, [imageSrc, onImageCaptured]);

  return (
    <div className="container mx-auto p-4">
      {cameraActive && (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            videoConstraints={videoConstraints}
            className="mb-4"
          />
          <ActionButtons
            onSaveClick={captureImage}
            onCancelClick={handleCancel}
            submitText="撮影"
          />
        </>
      )}
      {imageSrc && (
        <>
          <div className="mt-4 items-center">
            <Image
              src={imageSrc}
              alt="Captured"
              width={300}
              height={300}
              unoptimized
            />
          </div>
        </>
      )}
    </div>
  );
};

export default WebcamComponent;
