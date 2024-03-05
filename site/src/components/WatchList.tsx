"use client";

import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import CountDown from "@/components/ui/CountDown";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type getWatchList } from "@/lib/prisma/users";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function WatchList({
  watchList,
}: Readonly<{ watchList: Awaited<ReturnType<typeof getWatchList>> }>) {
  return (
    <div>
      <h1>Watch List</h1>
      <ul className="flex flex-col space-y-2">
        {watchList.map((listing) => (
          <WatchListItem listing={listing} key={listing.id} />
        ))}
      </ul>
    </div>
  );
}

function WatchListItem({
  listing,
}: Readonly<{
  listing: Awaited<ReturnType<typeof getWatchList>> extends (infer U)[]
    ? U
    : never;
}>) {
  const router = useRouter();
  const { toast } = useToast();
  const removeFromWatchList = async (id: string) => {
    const res = await fetch("/api/watchlist", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ listingId: id }),
    });
    if (res.ok) {
      toast({
        title: "Listing removed from watchlist",
        description: `${listing.title} has been removed from your watchlist`,
      });
      router.refresh();
      return;
    }
    toast({
      title: "Error",
      description:
        "There was an error removing the listing from your watchlist",
      variant: "destructive",
    });
  };

  return (
    <li className="group relative overflow-hidden">
      <Link href={`/listings/${listing.id}`}>
        <Card>
          <CardHeader className="flex flex-row space-x-4 p-4">
            <div className="h-[184px] w-[184px] flex-shrink-0">
              <Image
                src={listing.images[0].url}
                alt={listing.title}
                className="h-full w-full rounded-md bg-popover object-cover"
                width={184}
                height={184}
              />
            </div>
            <div className="flex w-full flex-col justify-between">
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between">
                  <CardTitle>{listing.title}</CardTitle>
                  <span className="flex justify-end text-muted-foreground">
                    {listing.user.name}
                  </span>
                </div>
                <CardDescription>{listing.description}</CardDescription>
              </div>
              <div className="flex justify-between">
                <span>
                  ${listing.price.toFixed(2)} • {listing.bids.length} bid
                  {listing.bids.length === 1 ? "" : "s"}
                </span>
                <div className="flex flex-col text-right">
                  <span>Auction Ends</span>
                  <CountDown endTime={new Date(listing?.expires)} />
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>
      </Link>
      <Button
        onClick={(event) => {
          event.stopPropagation();
          removeFromWatchList(listing.id);
        }}
        className="absolute right-2 top-1/2 h-10 w-10 -translate-y-1/2 translate-x-12 rounded-full px-0 py-0 transition-transform group-hover:translate-x-0"
        variant="outline"
      >
        <X className="h-5 w-5" />
      </Button>
    </li>
  );
}
