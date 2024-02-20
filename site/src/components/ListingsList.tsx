import { DEFAULT_PAGE_SIZE } from "../consts";
import PageSelector from "@/components/PageSelector";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
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

  const listings = await getAllListings(page, pageSize);
  const hasNextPage = listings.length >= (pageSize ?? DEFAULT_PAGE_SIZE);

  return (
    <div>
      <ul>
        {listings.map((listing) => (
          <li key={listing.id} style={{ marginBottom: "10px" }}>
            <Link href={`/listings/${listing.id}`}>
              {listing.title}
              <AspectRatio ratio={1}>
                <ResizablePanelGroup
                  direction="horizontal"
                  className="min-h-[200px] max-w-md"
                >
                  <ResizablePanel defaultSize={75}>
                    <div className="flex h-full items-center justify-center p-6">
                      <Image
                        src={
                          listing?.image ??
                          "https://source.unsplash.com/random/400x400"
                        }
                        alt={listing.title ?? "Listing Image"}
                        width={200}
                        height={200}
                      />
                    </div>
                  </ResizablePanel>
                  <ResizablePanel>
                    <div className=" items-center justify-center p-6">
                      {listing.description}
                    </div>
                    <div>{listing.price}</div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </AspectRatio>
            </Link>
          </li>
        ))}
      </ul>
      <PageSelector
        href="/"
        currentPage={page ?? 1}
        hasNextPage={hasNextPage}
      />
    </div>
  );
}
