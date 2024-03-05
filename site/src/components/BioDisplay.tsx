"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function BioDisplay({
  bio,
  isOwner,
}: Readonly<{ bio: string | null; isOwner: boolean }>) {
  const [editing, setEditing] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const formSchema = z.object({
    bio: z.string().max(500).optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    const res = await fetch("/api/bio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      toast({
        title: "Bio updated sucessfully!",
      });
      setEditing(false);
      router.refresh();
      return;
    }
    toast({
      title: "There was an error updating your bio",
      description: "Try submitting again",
      variant: "destructive",
    });
  };

  if (editing) {
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative flex items-end space-x-1"
        >
          <FormItem>
            <FormField
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="min-h-[64px] w-[250px]"
                      placeholder="Tell us about yourself"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormItem>
          <div className="absolute bottom-1 right-4 flex space-x-1">
            <Button
              onClick={() => setEditing(false)}
              className="h-6 w-6 p-1 px-1 py-1"
              variant="outline"
            >
              <X className="h-4 w-4" />
            </Button>
            <Button type="submit" className="h-6 w-6 p-1 px-1 py-1">
              <Save className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    );
  }

  return (
    <div className="relative flex items-end space-x-1">
      <div className="min-h-[64px] w-[250px] rounded-md border border-input bg-background px-3 py-2 text-sm">
        {bio && bio.length > 0 ? bio : "No Bio Yet"}
      </div>
      {isOwner && (
        <Button
          onClick={() => setEditing(true)}
          className="absolute bottom-1 right-1 h-6 w-6 p-1 px-1 py-1"
          variant="outline"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
