import prisma from "@/lib/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  // delete all listings:
  return NextResponse.json({
    res: await prisma.listing.deleteMany(),
  });
}
