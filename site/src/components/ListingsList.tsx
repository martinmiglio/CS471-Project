"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Listing } from "@prisma/client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ListingsList() {
  const searchParams = useSearchParams();

  const page = Number.parseInt(searchParams.get("page") ?? "1");

  const [listings, setListings] = useState<Listing[]>([]);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      const query = new URLSearchParams({ page: page.toString() });
      const response = await fetch(`/api/listings?${query.toString()}`);
      const {
        listings,
        nextPage,
      }: { listings: Listing[]; nextPage: null | number } =
        await response.json();
      setHasNextPage(nextPage !== null);
      setListings(listings);
    };
    fetchListings();
  }, [page]);

  return (
    <div>
      <ul>
        {listings.map((listing) => (
          <li key={listing.id}>
            <Link href={`/listings/${listing.id}`}>{listing.title}</Link>
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
