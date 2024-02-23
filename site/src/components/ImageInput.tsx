"use client";

import { Input } from "@/components/ui/input";
import { useS3Upload } from "next-s3-upload";
import { useState } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  setLoading?: (isLoading: boolean) => void;
}

export default function ImageUploader({
  onChange,
  setLoading,
  ...props
}: Readonly<InputProps>) {
  const { uploadToS3 } = useS3Upload();
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setLoading?.(true);
    if (!event.target.files?.[0]) {
      return;
    }
    const files = Array.from(event.target.files);
    setFiles(files);

    const uploadPromises: ReturnType<typeof uploadToS3>[] = [];

    for (let file of files) {
      uploadPromises.push(uploadToS3(file));
    }

    const uploads = await Promise.all(uploadPromises);

    const urls = uploads.map(
      ({ key }) => `https://${process.env.NEXT_PUBLIC_CDN_DOMAIN}/${key}`,
    );

    onChange?.({
      target: {
        value: urls,
      },
    } as any);
    setLoading?.(false);
  };

  return (
    <Input
      id="picture"
      type="file"
      onChange={handleFileChange}
      accept=".jpg,.jpeg,.png"
      data-umami-event="Image Upload"
      data-umami-event-file-name={files.map((file) => file.name + ";")}
      {...props}
    />
  );
}
