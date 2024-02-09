"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import { type ReactNode, useEffect, useState } from "react";

export function ThemeProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return children;
  }

  return (
    <NextThemeProvider attribute="class" disableTransitionOnChange={true}>
      {children}
    </NextThemeProvider>
  );
}