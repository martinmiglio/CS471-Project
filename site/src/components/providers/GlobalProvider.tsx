import AuthProvider from "./AuthProvider";
import ThemeProvider from "./ThemeProvider";
import { getServerSession } from "next-auth";
import type { ReactNode } from "react";

export default async function Provider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <AuthProvider session={session}>
      <ThemeProvider>{children}</ThemeProvider>
    </AuthProvider>
  );
}
