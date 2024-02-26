import { DEFAULT_PAGE_SIZE } from "../consts";
import ListingsFilter from "@/components/ListingsFilter";
import PageSelector from "@/components/PageSelector";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ORDER, ORDER_BY, ACTIVE, getAllListings } from "@/lib/prisma/listings";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";

export const querySchema = z.object({
  pageSize: z.coerce.number(),
  page: z.coerce.number(),
  active: z.enum(ACTIVE).optional(),
  orderBy: z.enum(ORDER_BY).optional(),
  order: z.enum(ORDER).optional(),
});

export default async function ListingsList({
  query,
}: Readonly<{
  query: {
    page?: string;
    pageSize?: string;
    active?: string;
    orderBy?: string;
    order?: string;
  };
}>) {
  const defaultQuery = {
    pageSize: DEFAULT_PAGE_SIZE,
    page: 1,
  };

  const res = querySchema.safeParse({
    ...defaultQuery,
    ...query,
  });

  let listings: Awaited<ReturnType<typeof getAllListings>> | null[] = [];
  let parsedQuery: z.infer<typeof querySchema> | undefined = defaultQuery;

  if (res.success) {
    console.log(JSON.stringify({ sentQuery: res.data }, null, 2));
    listings = await getAllListings(res.data);
    parsedQuery = res.data;
  } else {
    listings = await getAllListings({
      page: 1,
      pageSize: DEFAULT_PAGE_SIZE,
    });
  }

  const { page, pageSize } = parsedQuery;

  const hasNextPage = listings.length >= (pageSize ?? DEFAULT_PAGE_SIZE);

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex w-full justify-end">
        <ListingsFilter query={parsedQuery} />
      </div>
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
      <PageSelector
        href="/"
        currentPage={page}
        hasNextPage={hasNextPage}
        query={query}
      />
    </div>
  );
}
