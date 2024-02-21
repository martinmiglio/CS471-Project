import prisma from "@/lib/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
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
  callbacks: {
    async session({ session }) {
      if (
        // process.env.VERCEL_ENV === "preview" ||
        !env.TESTING_USER_ID ||
        !env.TESTING_USER_EMAIL
      ) {
        return session;
      }

      session.user = {
        name: "Testing",
        email: env.TESTING_USER_EMAIL,
      };

      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
  secret: env.NEXTAUTH_SECRET,
};

export default authOptions;
