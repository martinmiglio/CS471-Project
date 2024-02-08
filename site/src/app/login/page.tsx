// TODO: next-auth features can be implemented after api/auth is merged
// import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
// import { getServerSession } from "next-auth/next";
// import { getProviders } from "next-auth/react";
// import { redirect } from "next/navigation";
import Jumbotron from "@/components/Jumbotron";

export default function Page() {
  // const session = await getServerSession(authOptions); // maybe dont use server session
  // if (session) {
  //   return redirect("/");
  // }
  // otherwise, show login page

  // const providers = (await getProviders()) ?? []; // each provider should be displayed as a button

  // TODO: Implement login page
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:py-16">
        <Jumbotron />
        <div>
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            Welcome!
          </h1>
        </div>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
          <div className="mb-6">
            <label
              htmlFor="default-input"
              className="mb-2 block text-sm font-bold text-gray-900 dark:text-white"
            >
              Username
            </label>
            <input
              type="text"
              id="default-input"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
          <div className="mb-6">
            <label
              htmlFor="default-input"
              className="mb-2 block text-sm font-bold text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="text"
              id="default-input"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-8">
        <button className="rounded-md bg-blue-600 px-4 py-2 text-white">
          Login
        </button>
        <button className="rounded-md bg-green-600 px-4 py-2 text-white">
          Sign Up
        </button>
      </div>
    </section>
  );
}
