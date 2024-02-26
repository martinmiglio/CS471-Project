import BidHistory from "@/components/BidHistory";
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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

  const highestBid = !listing
    ? { price: 0 }
    : listing.bids.length == 0
      ? listing
      : listing.bids.reduce((a, b) => (a.price > b.price ? a : b));

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex w-full flex-col space-x-0 space-y-2 md:flex-row md:space-x-2 md:space-y-0">
        <Carousel opts={{ loop: true }} className="mx-auto md:mx-0">
          <CarouselContent className="h-[400px] w-[400px]">
            {listing.images.map((image) => (
              <CarouselItem key={image.id}>
                <Image
                  src={image.url}
                  alt={listing.title + " Image"}
                  quality={100}
                  className="h-full w-full rounded-md bg-popover object-cover"
                  width={400}
                  height={400}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {listing.images.length > 1 && (
            <>
              <CarouselPrevious className="bottom-2 left-2 top-[none] translate-y-[none] bg-card/40 backdrop-blur-sm backdrop-filter" />
              <CarouselNext className="bottom-2 right-2 top-[none] translate-y-[none] bg-card/40 backdrop-blur-sm backdrop-filter" />
            </>
          )}
        </Carousel>
        <Card className="flex-grow">
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
              <span>
                ${highestBid.price.toFixed(2)} • {listing.bids.length} bid
                {listing.bids.length === 1 ? "" : "s"}
              </span>
            </div>
          </CardContent>
          <CardFooter className="flex w-full justify-center space-x-2">
            <PlaceBidButton listing={listing} />
            <Button variant="secondary">Add to Watchlist</Button>
          </CardFooter>
        </Card>
      </div>
      <BidHistory listing={listing} />
    </div>
  );
}
