import React from "react";

import SearchBar from "./SearchBar";

const SearchSection = () => {
  return (
    <div className="bg-train relative z-[-1000] h-[500px] w-full bg-cover bg-center bg-no-repeat font-bold">
      <p className="text-secondary box-border block text-center text-2xl">
        WaysToYourHeart - Guarantee 150% refund if transport service is not provided
      </p>
      <SearchBar />
    </div>
  );
};

export default SearchSection;
