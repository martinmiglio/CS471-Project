import AuthProvider from "./AuthProvider";
import ThemeProvider from "./ThemeProvider";
import ToastProvider from "./ToastProvider";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import type { ReactNode } from "react";

export default async function Provider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <AuthProvider session={session}>
      <ThemeProvider>
        <ToastProvider>{children}</ToastProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
