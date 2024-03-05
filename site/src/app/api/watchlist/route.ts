import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import {
  addToWatchList,
  getWatchList,
  removeFromWatchList,
} from "@/lib/prisma/users";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession({ req, ...authOptions });

  if (!session?.user?.email) {
    return NextResponse.json(
      {
        message: "unauthenticated",
      },
      { status: 401 },
    );
  }

  return NextResponse.json({
    listings: await getWatchList(session.user.email),
  });
}

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

  const { listingId } = await req.json();

  if (!listingId) {
    return NextResponse.json(
      {
        message: "listingId is required",
      },
      { status: 400 },
    );
  }

  await addToWatchList(session.user.email, listingId);

  return NextResponse.json({
    message: "added",
  });
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession({ req, ...authOptions });

  if (!session?.user?.email) {
    return NextResponse.json(
      {
        message: "unauthenticated",
      },
      { status: 401 },
    );
  }

  const { listingId } = await req.json();

  if (!listingId) {
    return NextResponse.json(
      {
        message: "listingId is required",
      },
      { status: 400 },
    );
  }

  await removeFromWatchList(session.user.email, listingId);

  return NextResponse.json({
    message: "removed",
  });
}
