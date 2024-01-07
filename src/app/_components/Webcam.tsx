"use client";
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { CameraIcon } from "@heroicons/react/24/outline";

const WebcamComponent = () => {
  const webcamRef = useRef<Webcam>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const videoConstraints = {
    facingMode: "environment",
  };

  const toggleCamera = () => {
    setIsCameraActive(!isCameraActive);
  };

  return (
    <>
      {isCameraActive && (
        <Webcam
          audio={false}
          ref={webcamRef}
          videoConstraints={videoConstraints}
        />
      )}
      <CameraIcon className="h-5 w-5" onClick={toggleCamera} />
    </>
  );
};

export default WebcamComponent;
