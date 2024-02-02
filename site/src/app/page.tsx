import { Button } from "@/components/ui/button";
import "@/styles/globals.css";

export default function Page() {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:py-16">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl ">
          Biddr. Bid More. Be Happy.
        </h1>
        <p className="mb-8 text-lg font-normal text-primary sm:px-16 lg:px-48 lg:text-xl">
          Buy, Sell, Trade!
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
          <Button className="inline-flex items-center justify-center px-5 py-3 sm:ms-4">
            Log In
            <svg
              className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Button>
          <Button className="inline-flex items-center justify-center px-5 py-3 sm:ms-4">
            Learn more
          </Button>
        </div>
      </div>
    </section>
  );
}
