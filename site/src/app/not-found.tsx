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

export default function NotFound() {
  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle>
          Couldn&apos;t find what you&apos;re looking for...
        </CardTitle>
        <CardDescription>404 - Page Not Found</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href="/">Go home</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
