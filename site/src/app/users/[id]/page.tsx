"use-client";

import BidHistory from "@/components/BidHistory";
import ListingsList from "@/components/ListingsList";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { getUser, getUserByEmail } from "@/lib/prisma/users";
import { UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
export default async function UserPage({
  params,
  searchParams,
}: Readonly<{
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}>) {
  const user = await getUser(params.id);
  if (!user) {
    const userByEmail = await getUserByEmail(decodeURIComponent(params.id));
    if (userByEmail) {
      redirect(`/users/${userByEmail.id}`);
    }
    redirect("/404");
  }

  const query = {
    ...searchParams,
    user: params.id,
  };

  return (
    <div className="flex flex-col space-y-2">
      <h1>{user.name}</h1>
      <div className="flex flex-row space-x-10">
        <div>
          <Avatar className="h-30 w-30">
            {user?.image ? (
              <AvatarImage src={user.image} alt={user.name ?? "User Image"} />
            ) : (
              <AvatarFallback className="select-none">
                <UserRound className="h-20 w-20" />
              </AvatarFallback>
            )}
          </Avatar>
        </div>
        <div className="flex w-[250px] flex-col rounded-md border border-input bg-background px-3 py-2 text-sm">
          {user.bio??"No Bio Yet"}
        </div>
        <Button> Edit Bio </Button>
      </div>

      <div>
        <h1>Listing History</h1>
        <div className="flex-grow">
          <ListingsList query={query} href={`/users/${params.id}`} />
        </div>
      </div>
      <h1>Bid History</h1>
        <ul className="flex w-full flex-col space-y-2">
         {user?.bids.map((bid) => (
          <li key={bid.id} className="flex">
            <Link href={`/listings/${bid.listing.id}`} className="w-full">
              <Card>
                <CardHeader className="flex w-full flex-row space-x-4 p-4">
                  <div className="h-[64px] w-[64px] flex-shrink-0">
                    <Image
                      src={bid.listing.images[0].url}
                      alt={bid.listing.title}
                      className="h-full w-full rounded-md bg-popover object-cover"
                      width={184}
                      height={184}
                    />
                  </div>
                  <div className="flex w-full flex-col justify-between">
                        <CardTitle>{bid.listing.title}</CardTitle>        
                      <span>Placed Bid At ${bid.price.toFixed(2)}</span>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          </li>
          ))}
        </ul>
    </div>
  );
}
