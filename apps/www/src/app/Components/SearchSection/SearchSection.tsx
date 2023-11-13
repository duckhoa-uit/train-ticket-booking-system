"use client";

import React from "react";

import SearchBar from "./SearchBar";

const SearchSection = () => {
  return (
    <div className="bg-train  bg-cover bg-center bg-no-repeat ">
      <div className="flex h-auto w-full max-w-7xl  flex-col items-center justify-center gap-3 p-10 font-bold md:mx-auto">
        <p className="text-secondary text-md box-border text-center md:text-2xl">
          WaysToYourHeart - Guarantee 150% refund if transport service is not provided
        </p>
        <SearchBar />
      </div>
    </div>
  );
};

export default SearchSection;
