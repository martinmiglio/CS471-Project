"use client";

import ImageInput from "@/components/ImageInput";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { type createListing } from "@/lib/prisma/listings";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const newListingSchema = z.object({
  title: z.string().min(4).max(50),
  description: z.string().max(500).optional(),
  price: z.coerce.number().nonnegative().optional(),
  images: z.string().url().array().nonempty(),
  expires: z.date().optional(),
});

export default function NewListingForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof newListingSchema>>({
    resolver: zodResolver(newListingSchema),
    defaultValues: {
      price: 0,
      expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  const onSubmit = async (newListing: z.infer<typeof newListingSchema>) => {
    setLoading(true);
    const res = await fetch("/api/listings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newListing),
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
            name="expires"
            render={({ field }) => (
              <FormItem className="flex flex-1 flex-col">
                <FormLabel>Expires At</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date <
                          new Date(
                            new Date().getTime() + 24 * 60 * 60 * 1000,
                          ) ||
                        date >
                          new Date(
                            new Date().getTime() + 30 * 24 * 60 * 60 * 1000,
                          )
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  The expiration date of your listing.
                </FormDescription>
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
                <ImageInput {...field} multiple={true} />
              </FormControl>
              <FormDescription>The image(s) of your listing.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Create Listing"}
        </Button>
      </form>
    </Form>
  );
}
