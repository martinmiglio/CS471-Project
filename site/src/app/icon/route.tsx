import { cookies } from "next/headers";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  const userTheme = cookies().get("theme")?.value ?? "light";

  const theme = {
    light: {
      foreground: "#2c2b21",
      background: "#f6f6da",
    },
    dark: {
      foreground: "#facc15",
      background: "#2c2b21",
    },
  };

  const colors = userTheme === "light" ? theme.light : theme.dark;

  const fontData = await fetch(
    new URL("../../assets/Gabarito.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{ fontFamily: '"Gabarito"' }}
        tw={`text-[${colors.foreground}] bg-[${colors.background}] text-5xl w-full h-full flex items-center justify-center rounded-2xl`}
      >
        <div tw="flex">B</div>
      </div>
    ),
    {
      width: 64,
      height: 64,
      fonts: [
        {
          name: "Gabarito",
          data: fontData,
          style: "normal",
        },
      ],
    },
  );
}
