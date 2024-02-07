// TODO: next-auth features can be implemented after api/auth is merged
// import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
// import { getServerSession } from "next-auth/next";
// import { getProviders } from "next-auth/react";
// import { redirect } from "next/navigation";

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
    <button>Login</button> 

      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Biddr. Bid More. Be Happy.</h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">Buy, Sell, Trade!</p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
              
            <div>
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Login</h1>
            </div>
            
            <div className="mb-6">
              <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
              <input type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </div>
                
            <div className="mb-6">
              <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </div>    
                       
          </div>
      </div>  
  </section>
  );
}
