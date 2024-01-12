"use client";

import { UploadButton } from "@/app/_utils/uploadthing";

const Image = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Image</div>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Files:", res);
          alert("Files uploaded!");
        }}
        onUploadError={(error: Error) => {
          alert(`Error: ${error.message}`);
        }}
      />
    </main>
  );
};

export default Image;
