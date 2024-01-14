import React, { useState, useEffect } from "react";
import { supabase } from "../_utils/supabaseClient";
import Image from "next/image";

interface ImageUploaderProps {
  file: File;
  onReset: () => void;
}

const ImageUploader = ({ file, onReset }: ImageUploaderProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  }, [file]);

  const saveImage = async () => {
    if (!(file instanceof File)) return;

    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error } = await supabase.storage
      .from("mealPhoto")
      .upload(filePath, file);
    if (error) {
      console.error("Error uploading file ", error);
    }
    alert("File uploaded successfully!");
    setPreviewUrl(null);
    onReset();
  };

  const discardImage = () => {
    setPreviewUrl(null);
    onReset();
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={saveImage}
        disabled={!file}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        保存
      </button>
      <button
        onClick={discardImage}
        className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
      >
        削除
      </button>
      {previewUrl && (
        <div className="mt-4">
          <Image
            src={previewUrl}
            alt="Preview"
            width={200}
            height={200}
            unoptimized
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
