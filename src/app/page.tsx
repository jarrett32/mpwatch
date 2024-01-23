import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";
import Header from "./_components/Header";
import Notify from "./_components/Notify";
import SearchBar from "./_components/SearchBar";
import Submit from "./_components/Submit";

export default async function Home() {
  return (
    <main className="min-h-screen flex-col bg-gradient-to-tl from-[#091d49] to-[#0c0c18] text-white">
      <div className="container flex max-w-6xl flex-col justify-center gap-12 px-4">
        <Header />
        <div className="flex w-full flex-col">
          <SearchBar />
          <div className="p-2"></div>
          <Submit />
        </div>
      </div>
    </main>
  );
}
