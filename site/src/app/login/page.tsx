// TODO: next-auth features can be implemented after api/auth is merged
// import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
// import { getServerSession } from "next-auth/next";
// import { getProviders } from "next-auth/react";
// import { redirect } from "next/navigation";

export default async function Page() {
  // const session = await getServerSession(authOptions);
  // if (session) {
  //   return redirect("/");
  // }
  // otherwise, show login page

  // const providers = (await getProviders()) ?? []; // each provider should be displayed as a button

  // TODO: Implement login page
  return <button>Login</button>;
}
