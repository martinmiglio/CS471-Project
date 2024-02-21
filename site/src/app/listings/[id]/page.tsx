import PlaceBidButton from "@/components/PlaceBidButton";
import CountDown from "@/components/ui/CountDown";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getListingById } from "@/lib/prisma/listings";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function ListingsPage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  const listing = await getListingById(params.id);

  if (!listing) {
    redirect("/404");
  }

  return (
    <div className="flex w-full flex-col space-x-0 space-y-2 md:flex-row md:space-x-2 md:space-y-0">
      <Image
        src={listing.image}
        alt={listing.title + " Image"}
        className="mx-auto rounded-md object-cover"
        width={400}
        height={400}
      />
      <Card>
        <CardHeader>
          <CardTitle>
            {listing.title}
            <div className="text-sm text-muted-foreground">
              {listing.user.name}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {listing.description}
          <div className="mt-4 text-sm text-muted-foreground">
            <div className="flex space-x-1">
              <span>Time remaining: </span>
              <CountDown endTime={new Date(listing?.expires)} />
            </div>
            <span>${listing.price.toFixed(2)} • 0 bids</span>
          </div>
        </CardContent>
        <CardFooter className="flex w-full justify-center space-x-2">
          <PlaceBidButton />
          <Button variant="secondary">Add to Watchlist</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
