"use client";

import Jumbotron from "@/components/Jumbotron";
import { Button } from "@/components/ui/button";
import { getProviders, useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { data: session } = useSession();
  const router = useRouter();
  const [providers, setProviders] = useState<Awaited<
    ReturnType<typeof getProviders>
  > | null>(null);

  useEffect(() => {
    getProviders().then((providers) => {
      setProviders(providers);
    });
  }, []);

  if (session) {
    router.push("/");
    return null;
  }

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:py-16">
        <Jumbotron />
        <div className="flex flex-col space-y-3 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome! Sign in to continue
          </h1>
          {providers && (
            <div className="my-3">
              {Object.keys(providers).map((providerName) => {
                const provider = providers[providerName];
                if (provider.id === "email") return null;
                return (
                  <Button
                    key={provider.id}
                    onClick={() => signIn(provider.id)}
                    data-umami-event={`Auth Form - Sign In with ${provider.name}`}
                  >
                    Sign in with {provider.name}
                  </Button>
                );
              })}
            </div>
          )}
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking sign in, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
