"use client";

import { Toaster } from "@/components/ui/toaster";
import React from "react";

export default function ToastProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return children;
  }

  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
