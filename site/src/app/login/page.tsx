// TODO: next-auth features can be implemented after api/auth is merged
// import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
// import { getServerSession } from "next-auth/next";
// import { getProviders } from "next-auth/react";
// import { redirect } from "next/navigation";
import Jumbotron from "@/components/Jumbotron";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Page() {
  // const session = await getServerSession(authOptions); // maybe dont use server session
  // if (session) {
  //   return redirect("/");
  // }
  // otherwise, show login page

  // const providers = (await getProviders()) ?? []; // each provider should be displayed as a button

  // TODO: Implement login page
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:py-16">
        <Jumbotron />
        <div>
          <h1 className="mb-4 text-2xl leading-none tracking-tight md:text-3xl lg:text-4xl">
            Welcome!
          </h1>
        </div>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
          <div className="mb-6">
            <Label htmlFor="username">Username</Label>
            <Input type="text" id="username" />
          </div>
        </div>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
          <div className="mb-6">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" />
          </div>
        </div>
      </div>
      <div className="flex justify-center space-x-3">
        <Button>Login</Button>
        <Button>Sign Up</Button>
      </div>
    </section>
  );
}
