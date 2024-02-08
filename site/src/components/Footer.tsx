import Link from "next/link";

export default function Footer() {
  const authors: { name: string; url?: string }[] = [
    { name: "Aaron Dehaven" },
    { name: "Martin Miglio", url: "https://martinmiglio.dev" },
    { name: "Nathan Miller" },
    { name: "Brady Robinson" },
  ];

  return (
    <div className="flex w-full flex-row flex-wrap items-center justify-between py-8 text-sm text-primary">
      <div>
        © {new Date().getFullYear()}{" "}
        {authors.map((author, index) => (
          <span key={author.name}>
            {index > 0 && index < authors.length - 1 && ", "}
            {index > 0 && index === authors.length - 1 && " and "}
            {author.url ? (
              <Link
                href={author.url}
                className="hover:underline"
                data-umami-event={`Footer - ${author.name}`}
              >
                {author.name}
              </Link>
            ) : (
              author.name
            )}
          </span>
        ))}
      </div>
      <div className="flex flex-row space-x-4">
        <Link
          href="/privacy"
          className="hover:underline"
          data-umami-event="Footer - Privacy Policy"
        >
          Privacy
        </Link>
        <Link
          href="/terms"
          className="hover:underline"
          data-umami-event="Footer - Terms of Service"
        >
          Terms
        </Link>
      </div>
    </div>
  );
}
