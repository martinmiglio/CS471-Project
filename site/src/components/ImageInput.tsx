"use client";

import { Input } from "@/components/ui/input";
import { useS3Upload } from "next-s3-upload";
import { useState } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function ImageUploader({ onChange }: Readonly<InputProps>) {
  const { uploadToS3 } = useS3Upload();
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.files) {
      return;
    }

    if (!event.target.files[0]) {
      return;
    }

    setFile(event.target.files[0]);

    const { key } = await uploadToS3(event.target.files[0]);
    const url = `https://${process.env.NEXT_PUBLIC_CDN_DOMAIN}/${key}`;

    onChange?.({
      target: {
        value: url,
      },
    } as any);
  };

  return (
    <Input
      id="picture"
      type="file"
      onChange={handleFileChange}
      accept=".jpg,.jpeg,.png"
      data-umami-event="Image Upload"
      data-umami-event-file-name={file?.name}
    />
  );
}
