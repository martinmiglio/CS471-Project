/*
https://www.prisma.io/docs/orm/prisma-client/testing/unit-testing#prerequisites
*/
import prisma from "@/lib/prisma/client";
import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";

jest.mock("@/lib/prisma/client", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
