import prisma from "./client";

export async function getUser(id: string) {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      listings: true,
      bids: {
        include: {
          listing: { include: { images: true } },
        },
      },
    },
  });
}

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
    include: {
      listings: true,
    },
  });
}

export async function updateUser(email: string, data: { bio: string | null }) {
  return await prisma.user.update({
    where: { email },
    data,
  });
}
