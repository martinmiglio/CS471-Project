import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import { updateUser } from "@/lib/prisma/users";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

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

  const { bio } = await req.json();

  await updateUser(session.user.email, { bio });

  return NextResponse.json({ message: "success" });
}
