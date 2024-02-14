import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import NewListingForm from "@/components/NewListingForm";
import {
  Card,
  CardDescription,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a new listing</CardTitle>
        <CardDescription>
          Fill out the form below to create a new listing.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <NewListingForm />
      </CardContent>
    </Card>
  );
}
