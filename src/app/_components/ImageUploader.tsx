import React, { useState, useEffect } from "react";
import Image from "next/image";

interface ImageUploaderProps {
  file: File;
}

const ImageUploader = ({ file }: ImageUploaderProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  return (
    <div className="container mx-auto p-4">
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
