"use-client";

import ListingsList from "@/components/ListingsList";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
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
import { redirect } from "next/navigation";
import Image from "next/image";
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
    <div>
      {user.name}
      <div className="space-between flex">
        <Avatar>
          <AvatarImage src={user.image} />
        </Avatar>
        <Textarea>BIO GOES HERE</Textarea>
      </div>

      <ListingsList query={query} href={`/users/${params.id}`} />
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <div className="flex flex-row">
        <div class="flex-grow rounded-lg border bg-card text-card-foreground shadow-sm">
          <div class="flex flex-row ">
            Listing Image
            <h3 class="text-2xl font-semibold leading-none tracking-tight">Listing Title</h3>
            Date Posted
          </div>
            
        </div>
        <div class="flex-grow rounded-lg border bg-card text-card-foreground shadow-sm">
          <div class="flex flex-row ">
            Bid Image
            <h3 class="text-2xl font-semibold leading-none tracking-tight">Bid Title</h3>
            Bid Amount
          </div>
        </div>
        {user?.bids.map((bid) => (
          <div key={bid.id}>{JSON.stringify(bid, null, 2)}</div>
        ))}
      </div>
    </div>
  );
}
