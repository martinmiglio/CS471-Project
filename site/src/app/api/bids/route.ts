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

    try {
      const res = await placeNewBid(
        newBid.listingId,
        session.user.email,
        newBid.price,
      );
      return NextResponse.json({ bid: res });
    } catch (e: any) {
      return NextResponse.json(
        {
          message: "Error placing bid! " + (e?.message ?? "Unknown error!"),
        },
        {
          status: 500,
        },
      );
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
}
