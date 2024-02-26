import { DEFAULT_PAGE_SIZE } from "../consts";
import PageSelector from "@/components/PageSelector";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllListings } from "@/lib/prisma/listings";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";

export default async function ListingsList({
  query,
}: Readonly<{
  query: {
    page?: string;
    pageSize?: string;
  };
}>) {
  const querySchema = z.object({
    pageSize: z.coerce.number(),
    page: z.coerce.number(),
  });

  const { page, pageSize } = querySchema.parse({
    pageSize: query.pageSize ?? DEFAULT_PAGE_SIZE,
    page: query.page ?? 1,
  });

  const listings = await getAllListings({ page, pageSize });
  const hasNextPage = listings.length >= (pageSize ?? DEFAULT_PAGE_SIZE);

  return (
    <div className="flex flex-col space-y-2">
      <ul className="flex flex-col space-y-2">
        {listings.map((listing) => (
          <li key={listing.id}>
            <Link href={`/listings/${listing.id}`}>
              <Card>
                <CardHeader className="flex flex-row space-x-4">
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
                      <CardTitle>{listing.title}</CardTitle>
                      <CardDescription>{listing.description}</CardDescription>
                    </div>
                    <div className="flex justify-between">
                      <span>
                        ${listing.price.toFixed(2)} • {listing.bids.length} bid
                        {listing.bids.length === 1 ? "" : "s"}
                      </span>
                      <span className="text-muted-foreground">
                        {listing.user.name}
                      </span>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
      <PageSelector href="/" currentPage={page} hasNextPage={hasNextPage} />
    </div>
  );
}
