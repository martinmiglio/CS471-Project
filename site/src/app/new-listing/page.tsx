"use client";

import ImageInput from "@/components/ImageInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

export default function NewListingPage() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Label>
        Title:
        <Input {...register("title")} />
      </Label>
      <Label>
        Description:
        <Input {...register("description")} />
      </Label>
      <Label>
        Price:
        <Input
          {...register("price")}
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
        />
      </Label>
      <Label>
        Image:
        <ImageInput {...register("image")} />
      </Label>
      <Label>
        Expires At:
        <Input {...register("expiresAt")} type="datetime-local" />
      </Label>
      <Button asChild>
        <Input type="submit" />
      </Button>
    </form>
  );
}
