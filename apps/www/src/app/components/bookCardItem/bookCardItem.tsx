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
    <div className="min-w-[384px] max-w-sm flex-1">
      {type === "1" && (
        <div
          className={`shadow-max flex h-full ${bgColor} max-w-sm flex-col items-center justify-stretch gap-3 rounded-lg  p-4`}
        >
          <h3 className={`mb-3 text-center text-lg font-semibold ${textColor}`}>{title}</h3>
          <Button
            className="rounded-md bg-black px-4 py-2 text-white transition duration-300"
            variant="button"
          >
            Book Now
          </Button>
          <Image src={link ?? ""} alt={link ?? "some-image"} height={100} width={100} />
        </div>
      )}
      {type === "2" && (
        <div className="shadow-max flex h-full max-w-sm flex-col justify-center gap-3 rounded-lg bg-gray-300 p-4">
          <Image src={link ?? ""} alt={link ?? "some-image"} height={50} width={50} />
          <h3 className="mb-3 text-lg font-semibold text-black">{title}</h3>
          <p className="mb-4">{description}</p>
        </div>
      )}
    </div>
  );
};

export default BookCardItem;
