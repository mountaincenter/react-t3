"use client";
import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import Image from "next/image";

interface WebcamComponentProps {
  onImageCaptured: (image: string) => void;
}

const WebcamComponent: React.FC<WebcamComponentProps> = ({
  onImageCaptured,
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
          <button
            onClick={captureImage}
            className="mt-4 w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            撮影
          </button>
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
