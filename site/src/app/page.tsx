import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import Jumbotron from "@/components/Jumbotron";
import ListingsList from "@/components/ListingsList";
import { Button } from "@/components/ui/button";
import "@/styles/globals.css";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Page({
  searchParams,
}: Readonly<{
  searchParams: { [key: string]: string | string[] | undefined };
}>) {
  const session = await getServerSession(authOptions);

  if (session) {
    return <ListingsList query={searchParams} />;
  }

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:py-16">
        <Jumbotron />
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
          <Button
            className="inline-flex items-center justify-center px-5 py-3 sm:ms-4"
            asChild
          >
            <Link href="/login">
              Get started
              <svg
                className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
          </Button>
          <Button
            className="inline-flex items-center justify-center px-5 py-3 sm:ms-4"
            variant="outline"
            asChild
          >
            <Link href="/about">Learn more</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
