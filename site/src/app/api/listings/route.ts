import authOptions from "../auth/[...nextauth]/authOptions";
import {
  createListing,
  getAllListings,
  getListingById,
} from "@/lib/prisma/listings";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const DEFAULT_PAGE_SIZE = 20;
const DEFAULT_LISTING_DURATION = 1000 * 60 * 60 * 24 * 7; // 1 week in ms

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  if (searchParams.has("id")) {
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        {
          message: "id is required",
        },
        { status: 400 },
      );
    }

    const listing = await getListingById(id);
    return NextResponse.json({ listing });
  }

  const pageSize = Number.parseInt(
    searchParams.get("pageSize") ?? DEFAULT_PAGE_SIZE.toString(),
  );
  const page = Number.parseInt(searchParams.get("page") ?? "1");

  const listings = await getAllListings(page, pageSize);

  return NextResponse.json({
    listings,
    nextPage: listings.length === pageSize ? page + 1 : null,
  });
}

export const ListingSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number().positive().optional(),
  image: z.string().url(),
  expiresAt: z.date().optional(),
});

export async function POST(req: NextRequest) {
  // const session = await getServerSession({ req, ...authOptions });

  // if (!session?.user?.email) {
  //   return NextResponse.json(
  //     {
  //       message: "unauthenticated",
  //     },
  //     { status: 401 },
  //   );
  // }

  const unvalidatedPost = await req.json();

  let post;
  try {
    post = ListingSchema.parse(unvalidatedPost);
  } catch (e) {
    return NextResponse.json({}, { status: 400 });
  }

  const { title, description, price, image, expiresAt } = post;

  const listing = await createListing(
    // session.user.email,
    "marmig0404@gmail.com",
    title,
    description,
    price ?? 0,
    image,
    expiresAt ?? new Date(Date.now() + DEFAULT_LISTING_DURATION),
  );

  return NextResponse.json(
    {
      listing,
    },
    { status: 201 },
  );
}
