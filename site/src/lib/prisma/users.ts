import prisma from "./client";

export async function getUser(id: string) {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      listings: true,
      bids: true,
    },
  });
}

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
    include: {
      listings: true,
      bids: {
        include: {
          listing: true,
        },
      },
    },
  });
}
