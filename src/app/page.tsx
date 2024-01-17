import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";
import Header from "./_components/Header";
import Notify from "./_components/Notify";
import SearchBar from "./_components/SearchBar";
import Submit from "./_components/Submit";

export default async function Home() {
  return (
    <main className="min-h-screen flex-col bg-gradient-to-tl from-[#091d49] to-[#0c0c18] text-white">
      <Header />
      <div className="">
        <div className="container flex flex-col justify-center gap-12 px-4 py-16 ">
          <div className="flex w-full flex-col">
            {/* <p className="text-2xl text-white">
              {hello ? hello.greeting : "Loading tRPC query..."}
            </p> */}
            <SearchBar />
            <div className="p-2"></div>
            {/* <Notify /> */}
            <div className="p-4"></div>
            <Submit />
          </div>
        </div>
      </div>
    </main>
  );
}
