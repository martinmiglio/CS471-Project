"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import * as React from "react";

export default function ThemeProvider({
  children,
  ...props
}: Readonly<ThemeProviderProps>) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return children;
  }

  return (
    <NextThemesProvider
      {...{
        attribute: "class",
        defaultTheme: "dark",
        disableTransitionOnChange: true,
        ...props,
      }}
    >
      {children}
    </NextThemesProvider>
  );
}
