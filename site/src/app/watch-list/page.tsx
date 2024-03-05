import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import WatchList from "@/components/WatchList";
import { getWatchList } from "@/lib/prisma/users";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    redirect("/");
  }

  const watchList = await getWatchList(session.user.email);

  return <WatchList watchList={watchList} />;
}
