import Image from "next/image";
import React from "react";

import { Button } from "@ttbs/ui";

interface BookCardItemProps {
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
  hoverColor?: string;
  type: string;
  link?: string;
}

const BookCardItem: React.FC<BookCardItemProps> = ({
  title,
  description,
  bgColor,
  textColor,
  type,
  link,
}) => {
  return (
    <div>
      {type === "1" && (
        <div
          className={`flex-1 gap-2 p-4 ${bgColor} shadow-max flex max-h-[150px] min-w-max flex-col items-center justify-center rounded-lg p-4`}
        >
          <h3 className={`mb-3 text-lg font-semibold ${textColor}`}>{title}</h3>
          {/* <p className="mb-4">{description}</p> */}
          <Button
            className="rounded-md px-4 py-2 text-white transition duration-300"
            variant="button"
            color="primary"
          >
            Book Now
          </Button>
          <Image src={link ?? ""} alt={link ?? "some-image"} height={50} width={50} />
        </div>
      )}
      {type === "2" && (
        <div
          className="shadow-max flex max-h-[150px] min-w-max flex-1 flex-col items-center justify-center gap-2 rounded-lg bg-gray-300 p-2"
        >
          <h3 className="mb-3 text-lg font-semibold text-black">{title}</h3>
          <p className="mb-4">{description}</p>
        </div>
      )}
    </div>
  );
};

export default BookCardItem;
