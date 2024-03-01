import ListingsList from "@/components/ListingsList";
import { getUser, getUserByEmail } from "@/lib/prisma/users";
import { redirect } from "next/navigation";

export default async function UserPage({
  params,
  searchParams,
}: Readonly<{
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}>) {
  const user = await getUser(params.id);
  if (!user) {
    const userByEmail = await getUserByEmail(decodeURIComponent(params.id));
    if (userByEmail) {
      redirect(`/users/${userByEmail.id}`);
    }
    redirect("/404");
  }

  const query = {
    ...searchParams,
    user: params.id,
  };

  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <ListingsList query={query} href={`/users/${params.id}`} />
      <div>
        {user?.bids.map((bid) => (
          <div key={bid.id}>{JSON.stringify(bid, null, 2)}</div>
        ))}
      </div>
    </div>
  );
}
