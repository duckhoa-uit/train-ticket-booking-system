import type { FC } from "react";
import React from "react";

// import type { DropdownInputProps } from ".";
import { provinces } from "./SearchSection/provinces";

interface DropdownInputProps {
  dropdown: boolean;
  type: "depart" | "arrival";
  handleClick: (name: string, typeInput: string) => void;
}

const InputDropDown: FC<DropdownInputProps> = (prop) => {
  return (
    <div className="relative w-full">
      <ul
        className={` border-primary  absolute inset-0 z-10 mx-auto mt-1 h-60
             w-full overflow-y-auto rounded-lg border-2 bg-white px-1 py-2 transition-all duration-100 ${
               prop.dropdown ? "block" : "hidden"
             }`}>
        {provinces.map((item) => {
          return (
            <li
              className="hover:bg-lightblue py-2 pl-3 font-normal transition-all duration-300 hover:cursor-pointer"
              key={item.code}
              onClick={() => {
                prop.handleClick(item.name, prop.type);
              }}>
              {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default InputDropDown;
