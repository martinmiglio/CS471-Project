"use client";

import ExpirationDatePicker from "@/components/ExpirationDatePicker";
import ImageInput from "@/components/ImageInput";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { type createListing } from "@/lib/prisma/listings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const newListingSchema = z.object({
  title: z.string().min(4).max(50),
  description: z.string().max(500),
  price: z.coerce.number().nonnegative().optional(),
  images: z.string().url().array().nonempty(),
  expiresAt: z.number(),
});

export default function NewListingForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [imageInputLoading, setImageInputLoading] = useState(false);

  const form = useForm<z.infer<typeof newListingSchema>>({
    resolver: zodResolver(newListingSchema),
    defaultValues: {
      price: 0,
      expiresAt: 5,
    },
  });

  const onSubmit = async (newListing: z.infer<typeof newListingSchema>) => {
    setLoading(true);

    const res = await fetch("/api/listings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newListing,
        // overwrite the number days to actual date object
        expiresAt: new Date(
          new Date().getTime() + newListing.expiresAt * 24 * 60 * 60 * 1000,
        ),
      }),
    });

    if (res.ok) {
      const {
        listing,
      }: {
        listing: Awaited<ReturnType<typeof createListing>>;
      } = await res.json();
      router.push(`/listings/${listing.id}`);
      return;
    }

    toast({
      title: "There was an error creating your listing!",
      description: "Try submitting again",
      variant: "destructive",
    });
    setLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="My Listing" {...field} />
              </FormControl>
              <FormDescription>The name of your listing.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about your listing"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The description of your listing.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-2">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="flex flex-1 flex-col">
                <FormLabel>Starting price ($)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} step="0.01" min="0" />
                </FormControl>
                <FormDescription>
                  The starting price of your listing.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="expiresAt"
            render={({ field }) => (
              <FormItem className="flex flex-1 flex-col">
                <FormLabel>Expires In</FormLabel>
                <ExpirationDatePicker
                  selected={field.value}
                  onSelect={field.onChange}
                />
                <FormDescription>The duration of your listing.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <ImageInput
                  {...field}
                  multiple={true}
                  setLoading={setImageInputLoading}
                  disabled={imageInputLoading}
                />
              </FormControl>
              <FormDescription>The image(s) of your listing.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full"
          type="submit"
          disabled={loading || imageInputLoading}
        >
          {loading ? "Submitting..." : "Create Listing"}
        </Button>
      </form>
    </Form>
  );
}
