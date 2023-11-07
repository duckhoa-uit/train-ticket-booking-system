"use client";

import React from "react";


const SearchBar = () => {
  return (
    <div className="bg-primary absolute inset-0 m-auto h-10 w-4/5 rounded-md">
      <div className="flex">
        {/* <InputField /> */}
        {/* <Input /> */}
        <input type="text" id="depart" />
        <label htmlFor="depart">Nơi xuất phát</label>
      </div>
    </div>
  );
};

export default SearchBar;
