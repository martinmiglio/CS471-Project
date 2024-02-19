"use client"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Listing } from "@prisma/client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
export default function ListingsList() {
  const searchParams = useSearchParams();
  const page = Number.parseInt(searchParams.get("page") ?? "1");
  const [listings, setListings] = useState<Listing[]>([]);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const query = new URLSearchParams({ page: page.toString() });
        const response = await fetch(`/api/listings?${query.toString()}`);
        const { listings, nextPage }: { listings: Listing[]; nextPage: null | number } = await response.json();

        // Check if the component is still mounted before updating state
        if (listings && Array.isArray(listings)) {
          setListings(listings);
        }

        // Check if the component is still mounted before updating state
        if (nextPage !== null) {
          setHasNextPage(true);
        } else {
          setHasNextPage(false);
        }
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();

    // Cleanup function to handle potential memory leaks
    return () => {
      setListings([]);
      setHasNextPage(false);
    };
  }, [page]);

  return (
    <div>
      <ul>       
          {listings.map((listing) => (
          <li key={listing.id} style={{marginBottom: '10px'}}>
            <Link href={`/listings/${listing.id}`}>
              {listing.title}
              <AspectRatio ratio={1 / 1}>
                
                  <ResizablePanelGroup direction="horizontal" className="min-h-[200px] max-w-md">
                  <ResizablePanel defaultSize={75}>
                    <div className="flex h-full items-center justify-center p-6">
                        <Image
                          src={listing?.image ?? "https://source.unsplash.com/random/400x400"}
                          alt={listing.title ?? "Listing Image"}
                          width={200}
                          height={200}/>
                    </div>
                    </ResizablePanel>
                    <ResizablePanel >
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
      <Pagination>
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious href={`/?page=${page - 1}`} />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink href="#">{page}</PaginationLink>
          </PaginationItem>
          {hasNextPage && (
            <PaginationItem>
              <PaginationNext href={`/?page=${page + 1}`} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
