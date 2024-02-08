"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React from "react";

export default function AuthSessionProvider({
  session,
  children,
}: Readonly<{
  children: React.ReactNode;
  session: Session | null | undefined;
}>) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
