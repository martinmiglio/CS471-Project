"use client";

import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { type getListingById } from "@/lib/prisma/listings";
import { UserRound } from "lucide-react";
import Link from "next/link";

export default function BidHistory({
  listing,
}: Readonly<{
  listing: Awaited<ReturnType<typeof getListingById>>;
}>) {
  if (!listing || listing.bids.length === 0) {
    return null;
  }

  function checkIfSameDay(a: Date, b: Date): boolean {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  return (
    <div className="flex flex-col space-y-1">
      <p className="mb-1 text-xl">Bid History</p>
      {listing.bids.map((bid) => (
        <>
          <Separator />
          <div key={bid.id} className="flex justify-between">
            <span className="flex">
              ${bid.price.toFixed(2)} by{" "}
              <Link
                href={`/users/${bid.user.id}`}
                className="flex hover:underline"
              >
                <Avatar className="mx-1 h-6 w-6">
                  {bid.user?.image ? (
                    <AvatarImage
                      src={bid.user.image}
                      alt={bid.user.name ?? "User Image"}
                    />
                  ) : (
                    <AvatarFallback className="select-none">
                      <UserRound className="h-3 w-3" />
                    </AvatarFallback>
                  )}
                </Avatar>
                {bid.user.name}
              </Link>
            </span>
            <span>
              {checkIfSameDay(new Date(bid.createdAt), new Date())
                ? new Date(bid.createdAt).toLocaleTimeString()
                : new Date(bid.createdAt).toLocaleDateString()}
            </span>
          </div>
        </>
      ))}
    </div>
  );
}
