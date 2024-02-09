"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Moon, Sun, UserRound } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <span className="flex h-16 w-full items-center justify-between">
      <Link href="/" data-umami-event="NavBar - Home">
        <h1 className="select-none text-3xl text-primary">Biddr.pro</h1>
      </Link>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              {session?.user?.image ? (
                <AvatarImage
                  src={session.user.image}
                  alt={session.user.name ?? "User Image"}
                />
              ) : (
                <AvatarFallback className="select-none">
                  {session?.user?.name?.[0]?.toUpperCase() ?? (
                    <UserRound className="h-5 w-5" />
                  )}
                </AvatarFallback>
              )}
            </Avatar>
          </DropdownMenuTrigger>
          <NavBarDropdownContent />
        </DropdownMenu>
      ) : (
        <Button
          onClick={async () => {
            await signIn(undefined, { callbackUrl: "/" });
          }}
          data-umami-event="NavBar - Sign In"
        >
          Sign in
        </Button>
      )}
    </span>
  );
}

function NavBarDropdownContent() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <DropdownMenuContent>
      <DropdownMenuItem
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        data-umami-event="NavBar - Toggle Dark Mode"
      >
        {resolvedTheme === "dark" ? (
          <>
            <Sun className="mr-2 h-4 w-4" />
            <span>Light mode</span>
          </>
        ) : (
          <>
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark mode</span>
          </>
        )}
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        onClick={() => signOut({ callbackUrl: "/" })}
        data-umami-event="NavBar - Sign Out"
      >
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
