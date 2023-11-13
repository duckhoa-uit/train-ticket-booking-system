import React from "react";

import "./burger-menu.css";

interface Props {
  className: string;
  handleClick: () => void;
  id: string;
  openState?: boolean;
}

const handleClickIcon = (prop: Props) => {
  prop.handleClick();
};

const BurgerMenu: React.FC<Props> = (props) => {
  return (
    <button
      id={`${props.id}`}
      onClick={() => handleClickIcon(props)}
      className={`${props.className} burger-menu border-button-color rounded-md border-8 bg-transparent`}>
      <svg id="btn-menu--2" className="z-100 w-full" viewBox="0 0 100 100">
        <rect
          className={`top line ${props.openState ? " activeIcon topRotate" : ""} `}
          width="80"
          rx="5"
          height="10"
          fill="black"
          x="10"
          y="25"
        />
        <rect
          className={`middle line ${props.openState ? " opacity-0" : ""}`}
          width="80"
          rx="5"
          height="10"
          fill="black"
          x="10"
          y="45"
        />
        <rect
          className={`bottom line ${props.openState ? " activeIcon bottomRotate" : ""}`}
          width="80"
          rx="5"
          height="10"
          fill="black"
          x="10"
          y="65"
        />
      </svg>
    </button>
  );
};

export default BurgerMenu;
