import authOptions from "../auth/[...nextauth]/authOptions";
import { DEFAULT_LISTING_DURATION, DEFAULT_PAGE_SIZE } from "@/consts";
import {
  createListing,
  getAllListings,
  getListingById,
} from "@/lib/prisma/listings";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

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

  try {
    const querySchema = z.object({
      pageSize: z.coerce.number(),
      page: z.coerce.number(),
      orderBy: z.enum(["createdAt", "expires", "price"]).optional(),
      orderDirection: z.enum(["asc", "desc"]).optional(),
    });

    const query = querySchema.parse({
      pageSize: searchParams.get("pageSize") ?? DEFAULT_PAGE_SIZE,
      page: searchParams.get("page") ?? 1,
      orderBy: searchParams.get("orderBy") ?? undefined,
      orderDirection: searchParams.get("orderDirection") ?? undefined,
    });

    const listings = await getAllListings(query);

    return NextResponse.json({
      listings,
      nextPage: listings.length === query.pageSize ? query.page + 1 : null,
    });
  } catch (e) {
    console.error(JSON.stringify(e));
    return NextResponse.json(
      { message: "Invalid search query" },
      { status: 400 },
    );
  }
}

const ListingSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.coerce.number().nonnegative().optional(),
  images: z.string().url().array().nonempty(),
  expiresAt: z.coerce.date().optional(),
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

  const unvalidatedPost = await req.json();

  let post;
  try {
    post = ListingSchema.parse(unvalidatedPost);
  } catch (e) {
    console.error(JSON.stringify(e));
    return NextResponse.json({ message: "Invalid listing" }, { status: 400 });
  }

  const { title, description, price, images, expiresAt } = post;

  const listing = await createListing(
    session.user.email,
    title,
    description,
    price ?? 0,
    images,
    expiresAt ?? new Date(Date.now() + DEFAULT_LISTING_DURATION),
  );

  return NextResponse.json(
    {
      listing,
    },
    { status: 201 },
  );
}
