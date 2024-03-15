import prisma from "./client";

export async function placeNewBid(
  listingId: string,
  userEmail: string,
  price: number,
) {
  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
    select: {
      expires: true,
      price: true,
      user: { select: { email: true } },
      bids: {
        select: { user: { select: { email: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!listing) {
    throw new Error("Listing not found");
  }

  if (listing.user.email === userEmail) {
    throw new Error("You cannot bid on your own listing");
  }

  if (listing.bids.length > 0 && listing.bids[0].user.email === userEmail) {
    throw new Error("You cannot bid on the same listing twice in a row");
  }

  if (new Date(listing.expires).getTime() < new Date().getTime()) {
    throw new Error("Listing has expired");
  }

  if (price < listing.price) {
    throw new Error("Bid must be greater than the current price");
  }

  const res = await prisma.bid.create({
    data: {
      price,
      listing: { connect: { id: listingId } },
      user: { connect: { email: userEmail } },
    },
  });

  await prisma.listing.update({
    where: { id: listingId },
    data: { price },
  });

  return res;
}
