import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import Header from "./_components/Header";
import Notify from "./_components/Notify";
import SearchBar from "./_components/SearchBar";

export default async function Home() {
  const hello = await api.post.hello.query({ text: "from tRPC" });

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
            <Notify />
          </div>

          <CrudShowcase />
        </div>
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest.query();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
