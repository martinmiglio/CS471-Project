import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import BioDisplay from "@/components/BioDisplay";
import ListingsList from "@/components/ListingsList";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser, getUserByEmail } from "@/lib/prisma/users";
import { UserRound } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

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

  const session = await getServerSession(authOptions);
  const isOwner = session?.user?.email === user.email;

  const query = {
    ...searchParams,
    user: params.id,
  };

  return (
    <div className="flex flex-col space-y-2">
      <h1>{user.name}</h1>
      <div className="flex flex-row space-x-10">
        <div>
          <Avatar className="h-[64px] w-[64px]">
            {user?.image ? (
              <AvatarImage src={user.image} alt={user.name ?? "User Image"} />
            ) : (
              <AvatarFallback className="select-none">
                <UserRound className="h-5 w-5" />
              </AvatarFallback>
            )}
          </Avatar>
        </div>
        <BioDisplay bio={user.bio} isOwner={isOwner} />
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
