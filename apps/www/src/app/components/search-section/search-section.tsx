import SearchBar from "./search-bar";

export const SearchSection = () => {
  return (
    <div className="bg-[url('/img/bg-train.jpg')] bg-cover bg-center bg-no-repeat lg:px-0 lg:py-20">
      <div className="flex h-auto w-full max-w-7xl flex-col items-center justify-center gap-3 p-10 md:mx-auto">
        <p className="text-subtle text-md box-border text-center md:text-2xl">
          WaysToYourHeart - Guarantee 150% refund if transport service is not provided
        </p>
        <SearchBar />
      </div>
    </div>
  );
};
