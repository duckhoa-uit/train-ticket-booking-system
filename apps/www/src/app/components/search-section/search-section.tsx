import SearchBar from "./search-bar";

export const SearchSection = () => {
  return (
    <div className="relative min-h-[calc(100dvh-64px)] bg-[url('/img/railway-banner.webp')] bg-cover bg-center bg-no-repeat md:min-h-[calc(100dvh-80px)] lg:px-0 lg:py-20">
      {/* <div className="block pointer-events-none absolute left-0 top-0 h-[calc(75vw/4)] max-h-[300px] w-full bg-gradient-to-b from-black transition-opacity" /> */}
      <div className="pointer-events-none absolute bottom-0 left-0 block h-dvh max-h-[800px] w-full bg-gradient-to-t from-black transition-opacity" />

      <div className="z-50 flex h-auto w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-3 md:absolute md:left-1/2 md:top-1/2">
        <div className="px-8">
          <div className="relative z-10 mx-auto text-center lg:max-w-lg">
            <h1 className="text-subtle block text-5xl font-semibold leading-5 tracking-normal antialiased">
              Book your next trip
            </h1>
            <p className="text-subtle mb-10 mt-6 block w-full text-xl font-normal leading-7 tracking-normal antialiased lg:max-w-2xl">
              We&apos;re constantly trying to express ourselves and actualize our dreams. If you have the
              opportunity to play this game
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 w-full max-w-7xl -translate-x-1/2 p-10 md:mx-auto">
        <SearchBar />
      </div>
    </div>
  );
};
