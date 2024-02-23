import prisma from "@/lib/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { AuthOptions, RequestInternal, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { z } from "zod";

const schema = z.object({
  NEXTAUTH_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  TESTING_USER_ID: z.string().optional(),
  TESTING_USER_EMAIL: z.string().optional(),
});

const env = schema.parse(process.env);

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
  secret: env.NEXTAUTH_SECRET,
};

if (
  process.env.VERCEL_ENV === "preview" &&
  env.TESTING_USER_ID &&
  env.TESTING_USER_EMAIL
) {
  authOptions.providers.push(
    CredentialsProvider({
      id: "biddr",
      name: "Testing - Biddr.pro",
      credentials: {},
      authorize(
        credentials: Record<string, string> | undefined,
        req: Pick<RequestInternal, "headers" | "body" | "query" | "method">,
      ): User {
        return {
          id: env.TESTING_USER_ID ?? "",
          name: "Testing",
          email: env.TESTING_USER_EMAIL,
        };
      },
    }),
  );
  authOptions.session = {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  };
}

export default authOptions;
