import { useTheme as useNextTheme } from "next-themes";
import { useEffect } from "react";

export const useTheme = () => {
  const { resolvedTheme, setTheme } = useNextTheme();

  useEffect(() => {
    if (!resolvedTheme) {
      return;
    }
    document.cookie = `theme=${resolvedTheme}`;
  }, [resolvedTheme]);

  return { resolvedTheme, setTheme };
};
