import React from "react";
const Header = async () => {
  return (
    <div className="flex text-white md:justify-between">
      <h1 className="py-4 text-center font-bold md:px-4 lg:text-6xl">
        MarketplaceWatch
      </h1>

      {/* <div className="flex flex-col items-center justify-center gap-4 p-4 text-white">
        <p className="text-center text-2xl">
          {session && <span>Logged in as {session.user?.name}</span>}
        </p>
        <Link
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
          className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        >
          {session ? "Sign out" : "Sign in"}
        </Link>
      </div> */}
    </div>
  );
};

export default Header;
