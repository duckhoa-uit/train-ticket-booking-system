import React from "react";

import { Card, CardContent } from "@ttbs/ui";

import BookCardItem from "../bookCardItem/bookCardItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../carousel/carousel";
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
        "Easy Boarding is the UK's largest independent travel agent. Whether you'd like a short UK break, a sunny package holiday, an all inclusive getaway or something else entirely.",
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
        bgColor: "bg-gradient-to-b from-yellow-100 to-yellow-200",
        textColor: "text-black",
        hoverColor: "bg-pink-700",
        link: "/best-price.png",
      },
      {
        title: "No Fee on Credit & Debit Card Transactions",
        description: "We don't charge extra for card transactions.",
        bgColor: "bg-gradient-to-b from-blue-100 to-blue-200",
        textColor: "text-black",
        hoverColor: "bg-blue-700",
        link: "/debit-card.png",
      },
      {
        title: "Exclusive Deals for Hundreds of Destinations",
        description: "Get the best deals for your favorite destinations.",
        bgColor: "bg-gradient-to-b from-red-100 to-red-200",
        textColor: "text-black",
        hoverColor: "bg-pink-700",
        link: "/hot-deal.png",
      },
    ],
    "2": [
      {
        title: "Hassle-free Booking",
        description:
          "Easy Boarding is the UK's largest independent travel agent. Whether you'd like a short UK break, a sunny package holiday, an all inclusive getaway or something else entirely, our team will help you book the holiday of your dreams.",
        bgColor: "bg-pink-600",
        textColor: "text-white",
        hoverColor: "bg-pink-700",
        link: "/booking.png",
      },
      {
        title: "Trusted Travel Agents in UK",
        description:
          "Easy Boarding is the UK's largest independent travel agent. Whether you'd like a short UK break, a sunny package holiday, an all inclusive getaway or something else entirely, our team will help you book the holiday of your dreams.",
        bgColor: "bg-pink-600",
        textColor: "text-white",
        hoverColor: "bg-pink-700",
        link: "/trust.png",
      },
      {
        title: "Expert Travel Advice",
        description:
          "Easy Boarding is the UK's largest independent travel agent. Whether you'd like a short UK break, a sunny package holiday, an all inclusive getaway or something else entirely, our team will help you book the holiday of your dreams.",
        bgColor: "bg-pink-600",
        textColor: "text-white",
        hoverColor: "bg-pink-700",
        link: "/rating.png",
      },
    ],
    "3": [
      {
        username: "Ruby Ryan",
        reviewText:
          "Easy Boarding is the UK's largest independent travel agent. Whether you'd like a short UK break, a sunny package holiday, an all inclusive getaway or something else entirely.",
        rating: 4.9,
        maxRating: 5,
      },
      {
        username: "Ruby Ryan",
        reviewText:
          "Easy Boarding is the UK's largest independent travel agent. Whether you'd like a short UK break, a sunny package holiday, an all inclusive getaway or something else entirely.",
        rating: 3,
        maxRating: 5,
      },
      {
        username: "Ruby Ryan",
        reviewText:
          "Easy Boarding is the UK's largest independent travel agent. Whether you'd like a short UK break, a sunny package holiday, an all inclusive getaway or something else entirely.",
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
          link={bookItem.link}
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
    <div className="mx-auto mt-5 w-full max-w-7xl bg-gray-100 p-2">
      <div className="flex h-full w-full flex-col items-center">
        <div className="mb-5 text-center">{renderHeader(type)}</div>
        {type === "1" && (
          <div className="flex h-full w-full flex-col items-center gap-5 md:flex md:flex-row md:items-stretch md:justify-evenly md:overflow-x-auto">
            {CARD_ITEMS[type].map((item, index) => renderCardItem(type, item, index))}
          </div>
        )}
        {type === "2" && (
          <div className="flex h-full w-full flex-col items-center gap-5 md:flex-row md:items-stretch md:justify-evenly md:overflow-x-auto">
            {CARD_ITEMS[type].map((item, index) => renderCardItem(type, item, index))}
          </div>
        )}
        {type === "3" && (
          <div>
            <div className=" hidden h-full w-full flex-col items-center gap-5 md:flex md:flex-row md:items-stretch md:justify-between md:overflow-x-auto">
              {CARD_ITEMS[type].map((item, index) => renderCardItem(type, item, index))}
            </div>
            <Carousel className="mx-auto w-full max-w-xs md:hidden">
              <CarouselContent>
                {CARD_ITEMS[type].map((item, index) => {
                  const ratingCard = item as RatingCardObj;
                  return (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Card>
                          <CardContent className="p-0">
                            <RatingCardItem
                              key={index}
                              username={ratingCard.username ?? ""}
                              reviewText={ratingCard.reviewText ?? ""}
                              rating={ratingCard.rating ?? 0}
                              maxRating={ratingCard.maxRating ?? 5}
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        )}
        {type === "4" && (
          <div className="min-w-full">
            <dl className="mx-2 flex flex-col items-center gap-5 md:mx-auto md:w-3/4">
              {faqs.map((faq, index) => (
                <FaqItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </dl>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeSection;
