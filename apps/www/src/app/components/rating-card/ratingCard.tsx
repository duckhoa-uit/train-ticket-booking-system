import React from "react";

interface RatingCardItemProps {
  username: string;
  reviewText: string;
  rating: number;
  maxRating: number;
}

const RatingCardItem: React.FC<RatingCardItemProps> = ({ username, reviewText, rating, maxRating }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < maxRating; i++) {
      stars.push(
        <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>
      );
    }
    return stars;
  };
  return (
    <div className="max-w-sm rounded-lg bg-white p-4 text-black shadow-lg">
      <div className="mb-4 flex items-center">
        <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-400">
          <span className="text-xl">👤</span> {/* Placeholder for avatar icon */}
        </div>
        <h3 className="text-lg font-bold">{username}</h3>
      </div>
      <p className="mb-4 italic">{reviewText}</p>
      <div className="flex items-center">
        <div className="text-lg">{renderStars()}</div>
        <span className="ml-2">{`${rating}/${maxRating}`}</span>
      </div>
    </div>
  );
};

export default RatingCardItem;
