"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle>There was an issue!</CardTitle>
        <CardDescription>{error.name}</CardDescription>
      </CardHeader>
      <CardFooter>
        <span className="mx-auto flex w-full gap-2">
          <Button variant="outline" onClick={reset} className="flex-1">
            Try again
          </Button>
          <Button asChild className="flex-1">
            <Link href="/">Go home</Link>
          </Button>
        </span>
      </CardFooter>
    </Card>
  );
}
