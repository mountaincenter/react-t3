import React, { useState } from "react";
import { supabase } from "../_utils/supabaseClient";
import Image from "next/image";

const ImageUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        setFile(selectedFile);
        setPreviewUrl(URL.createObjectURL(selectedFile));
      }
    }
  };

  const uploadImage = async () => {
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
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="mb-4 text-lg font-bold">ImageUploader</div>
        <input
          type="file"
          accept="image/"
          onChange={handleFileChange}
          className="mb-4"
        />
        <button
          onClick={uploadImage}
          disabled={!file}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Upload
        </button>
        {previewUrl && (
          <div className="mt-4">
            <Image
              src={previewUrl}
              alt="Preview"
              className="max-w-xs"
              width={200}
              height={200}
              unoptimized
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ImageUploader;
