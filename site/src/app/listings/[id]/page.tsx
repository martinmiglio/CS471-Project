"use client";

import { getListingById } from "@/lib/prisma/listings";
import { useEffect, useState } from "react";

export default function ListingsPage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  const id = params.id;

  const [listing, setListing] = useState<null | Awaited<
    ReturnType<typeof getListingById>
  >>(null);

  useEffect(() => {
    const query = new URLSearchParams({ id });
    fetch(`/api/listings?${query.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setListing(data.listing);
      });
  }, [id]);

  return (
    <div>
      <pre>
        <code>{JSON.stringify(listing, null, 2)}</code>
        <img src={listing?.image} alt={listing?.title} />
      </pre>
    </div>
  );
}
