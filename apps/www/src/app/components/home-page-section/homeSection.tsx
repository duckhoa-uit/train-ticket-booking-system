import React from "react";

import BookCardItem from "../bookCardItem/bookCardItem";
import FaqItem from "../faq-item/faq-item";
import RatingCardItem from "../rating-card/ratingCard";

interface BaseCardObj {
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
  hoverColor: string;
}

interface BookCardObj extends BaseCardObj {
  link?: string;
}

interface RatingCardObj {
  username: string;
  reviewText: string;
  rating: number;
  maxRating: number;
}

type CardObj = BookCardObj | RatingCardObj;

interface CardItemsObj {
  [key: string]: CardObj[];
}

const HomeSection = ({ type }: { type: string }) => {
  const faqs = [
    {
      question: "Why is Bliss different from others?",
      answer:
        "Bliss Flights is the UK's largest independent travel agent. Whether you'd like a short UK break, a sunny package holiday, an all inclusive getaway or something else entirely.",
    },
    {
      question: "Do I have to pay during the booking process?",
      answer: "No, you can choose to pay later during the process...",
    },
    {
      question: "I have not received my booking confirmation, what to do now?",
      answer:
        "Wait for a Few Minutes: There might be a slight delay in the system sending out the confirmation email, especially during high traffic periods.",
    },
    {
      question: "How can I get the best price for my ticket booking?",
      answer:
        "Book in Advance: Prices often increase as the travel date approaches. Try to book your tickets well in advance to secure lower prices.",
    },
    {
      question: "Where can I find my booking confirmation?",
      answer:
        "Check the inbox of the email account you used to book the ticket. It's usually sent immediately after the booking is completed",
    },
  ];

  const CARD_ITEMS: CardItemsObj = {
    "1": [
      {
        title: "Price Match Guarantee",
        description: "We'll match the price if you find it cheaper elsewhere.",
        bgColor: "bg-pink-600",
        textColor: "text-white",
        hoverColor: "bg-pink-700",
        link: "/best-price.png",
      },
      {
        title: "No Fee on Credit & Debit Card Transactions",
        description: "We don't charge extra for card transactions.",
        bgColor: "bg-blue-600",
        textColor: "text-white",
        hoverColor: "bg-blue-700",
        link: "/debit-card.png",
      },
      {
        title: "Exclusive Deals for Hundreds of Destinations",
        description: "Get the best deals for your favorite destinations.",
        bgColor: "bg-pink-600",
        textColor: "text-white",
        hoverColor: "bg-pink-700",
        link: "/hot-deal.png",
      },
    ],
    "2": [
      {
        title: "Price Match Guarantee",
        description: "We'll match the price if you find it cheaper elsewhere.",
        bgColor: "bg-pink-600",
        textColor: "text-white",
        hoverColor: "bg-pink-700",
      },
      {
        title: "No Fee on Credit & Debit Card Transactions",
        description: "We don't charge extra for card transactions.",
        bgColor: "bg-pink-600",
        textColor: "text-white",
        hoverColor: "bg-pink-700",
      },
      {
        title: "Exclusive Deals for Hundreds of Destinations",
        description: "Get the best deals for your favorite destinations.",
        bgColor: "bg-pink-600",
        textColor: "text-white",
        hoverColor: "bg-pink-700",
      },
    ],
    "3": [
      {
        username: "Ruby Ryan",
        reviewText:
          "Bliss Flights is the UK's largest independent travel agent. Whether you'd like a short UK break, a sunny package holiday, an all inclusive getaway or something else entirely.",
        rating: 4.9,
        maxRating: 5,
      },
      {
        username: "Ruby Ryan",
        reviewText:
          "Bliss Flights is the UK's largest independent travel agent. Whether you'd like a short UK break, a sunny package holiday, an all inclusive getaway or something else entirely.",
        rating: 3,
        maxRating: 5,
      },
      {
        username: "Ruby Ryan",
        reviewText:
          "Bliss Flights is the UK's largest independent travel agent. Whether you'd like a short UK break, a sunny package holiday, an all inclusive getaway or something else entirely.",
        rating: 2,
        maxRating: 5,
      },
    ],
  };

  const SECTION_HEADERS: string[] = [
    "Why book with Easy Boarding",
    "Book Your Holiday With Complete Confidence",
    "What our Customers say about Us",
    "Frequently Asked Questions",
  ];
  function renderHeader(type: string) {
    let msg = "";
    if (type === "1") msg = SECTION_HEADERS[0];
    else if (type === "2") msg = SECTION_HEADERS[1];
    else if (type === "3") msg = SECTION_HEADERS[2];
    else if (type === "4") msg = SECTION_HEADERS[3];
    return <h2 className="text-2xl font-semibold">{msg}</h2>;
  }

  function renderCardItem(type: string, item: CardObj, index: number) {
    if (type === "1" || type === "2") {
      const bookItem = item as BookCardObj;
      return (
        <BookCardItem
          key={index}
          title={bookItem.title}
          description={bookItem.description}
          bgColor={bookItem.bgColor}
          textColor={bookItem.textColor}
          hoverColor={bookItem.hoverColor}
          type={type}
          link={type === "1" ? bookItem.link : undefined}
        />
      );
    } else if (type === "3") {
      const ratingCard = item as RatingCardObj;
      return (
        <RatingCardItem
          key={index}
          username={ratingCard.username ?? ""}
          reviewText={ratingCard.reviewText ?? ""}
          rating={ratingCard.rating ?? 0}
          maxRating={ratingCard.maxRating ?? 5}
        />
      );
    }
  }

  return (
    <div className="flex items-center justify-center bg-gray-100 p-2">
      <div className="w-full max-w-max">
        <div className="mb-6 text-center">{renderHeader(type)}</div>
        {type === "1" && (
          <div className="flex items-center justify-between space-x-4">
            {CARD_ITEMS[type].map((item, index) => renderCardItem(type, item, index))}
          </div>
        )}
        {type === "2" && (
          <div className="flex items-center justify-between space-x-4">
            {CARD_ITEMS[type].map((item, index) => renderCardItem(type, item, index))}
          </div>
        )}
        {type === "3" && (
          <div className="flex items-center justify-between space-x-4">
            {CARD_ITEMS[type].map((item, index) => renderCardItem(type, item, index))}
          </div>
        )}
        {type === "4" && (
          <dl className="space-y-6 divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <FaqItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </dl>
        )}
      </div>
    </div>
  );
};

export default HomeSection;
