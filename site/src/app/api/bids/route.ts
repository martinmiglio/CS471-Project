import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import { placeNewBid } from "@/lib/prisma/bids";
import { getListingById } from "@/lib/prisma/listings";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

const BidSchema = z.object({
  listingId: z.string(),
  price: z.coerce.number().nonnegative(),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession({ req, ...authOptions });

  if (!session?.user?.email) {
    return NextResponse.json(
      {
        message: "unauthenticated",
      },
      { status: 401 },
    );
  }

  const unvlaidatedBid = await req.json();

  try {
    const newBid = BidSchema.parse(unvlaidatedBid);

    const listing = await getListingById(newBid.listingId, true);

    if (!listing) {
      return NextResponse.json(
        { message: "listing not found" },
        { status: 404 },
      );
    }

    if (listing.user.email === session.user.email) {
      return NextResponse.json(
        {
          message: "Cannot bid on own listing!",
        },
        {
          status: 400,
        },
      );
    }

    if (new Date(listing.expires).getTime() < new Date().getTime()) {
      return NextResponse.json(
        { message: "Cannot bid on expired listings" },
        { status: 400 },
      );
    }

    const maxBid =
      listing.bids.length == 0
        ? { price: listing.price }
        : listing.bids.reduce((a, b) => (a.price > b.price ? a : b));

    if (maxBid && maxBid.price >= newBid.price) {
      return NextResponse.json(
        {
          message: "Not the highest bid!",
        },
        {
          status: 400,
        },
      );
    }

    const res = await placeNewBid(
      newBid.listingId,
      session.user.email,
      newBid.price,
    );

    return NextResponse.json({ bid: res });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
}
