import prisma from "./client";

export async function placeNewBid(
  listingId: string,
  userEmail: string,
  price: number,
) {
  return await prisma.bid.create({
    data: {
      price,
      listing: { connect: { id: listingId } },
      user: { connect: { email: userEmail } },
    },
  });
}
