"use client";

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { placeNewBid } from "@/lib/prisma/bids";
import type { getListingById } from "@/lib/prisma/listings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function PlaceBidButton({
  listing,
}: Readonly<{
  listing: Awaited<ReturnType<typeof getListingById>>;
}>) {
  const router = useRouter();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const newBidSchema = z.object({
    price: z.coerce.number().nonnegative(),
  });

  const highestBid = !listing
    ? { price: 0 }
    : listing.bids.length == 0
      ? listing
      : listing.bids.reduce((a, b) => (a.price > b.price ? a : b));

  const form = useForm<z.infer<typeof newBidSchema>>({
    resolver: zodResolver(newBidSchema),
    defaultValues: {
      price: highestBid.price + 1,
    },
  });

  if (!listing) {
    return null;
  }

  const onSubmit = async (newBid: z.infer<typeof newBidSchema>) => {
    const res = await fetch("/api/bids", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newBid, listingId: listing.id }),
    });

    if (res.ok) {
      const {
        bid,
      }: {
        bid: Awaited<ReturnType<typeof placeNewBid>>;
      } = await res.json();
      setIsOpen(false);
      toast({
        title: "Your bid was placed!",
        description: `Placed new bid on "${listing.title}" at $${bid.price.toFixed(2)}`,
      });
      router.refresh();
      return;
    }

    const { message }: { message: string | undefined } = await res.json();

    toast({
      title: "There was an error adding your bid!",
      description: message ?? "Try submitting again",
      variant: "destructive",
    });
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button>Place Bid</Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Bid Submission</h4>
            <p className="text-sm text-muted-foreground">
              Enter an amount to bid.
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="width">Amount</FormLabel>
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
              <Button className="w-full" type="submit">
                Submit Bid
              </Button>
            </form>
          </Form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
