import Header from "./_components/Header";
import SearchBar from "./_components/SearchBar";
import Submit from "./_components/Submit";

export default async function Home() {
  return (
    <main className="min-h-screen flex-col bg-gradient-to-tl from-[#091d49] to-[#0c0c18] text-white">
      <div className="flex w-full justify-center bg-slate-600 p-2 font-bold text-white">
        ** If you are no facebook entries appear, either the city is not yet
        supported or, facebook has changed their API. Please let us know if you
        have any issues. It may take up to 15 seconds **
      </div>
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
