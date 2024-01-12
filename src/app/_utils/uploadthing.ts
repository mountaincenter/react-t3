import { generateComponents } from "@uploadthing/react";
import type { OurFileRouter } from "@/server/api/routers/imageUploader";

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();
