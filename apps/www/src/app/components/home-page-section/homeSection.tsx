import React from "react";

import BookCardItem from "../bookCardItem/bookCardItem";
import FaqItem from "../faq-item/faq-item";
import RatingCardItem from "../rating-card/ratingCard";

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
  return (
    <div className="flex items-center justify-center bg-gray-100 p-2">
      <div className="w-full max-w-max">
        <div className="mb-6 text-center">
          {type === "1" && <h2 className="text-2xl font-semibold">Why book with Easy Boarding?</h2>}
          {type === "2" && (
            <h2 className="text-2xl font-semibold">Book Your Holiday With Complete Confidence</h2>
          )}
          {type === "3" && <h2 className="text-2xl font-semibold">What our Customers say about Us</h2>}
          {type === "4" && <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>}
        </div>
        {type === "1" && (
          <div className="flex items-center justify-between space-x-4">
            <BookCardItem
              title="Price Match Guarantee"
              description="We'll match the price if you find it cheaper elsewhere."
              bgColor="bg-pink-600"
              textColor="text-white"
              hoverColor="bg-pink-700"
              type="1"
              link="/best-price.png"
            />
            <BookCardItem
              title="No Fee on Credit & Debit Card Transactions"
              description="We don't charge extra for card transactions."
              bgColor="bg-blue-600"
              textColor="text-white"
              hoverColor="bg-blue-700"
              type="1"
              link="/debit-card.png"
            />
            <BookCardItem
              title="Exclusive Deals for Hundreds of Destinations"
              description="Get the best deals for your favorite destinations."
              bgColor="bg-yellow-600"
              textColor="text-white"
              hoverColor="bg-yellow-700"
              type="1"
              link="/hot-deal.png"
            />
          </div>
        )}
        {type === "2" && (
          <div className="flex items-center justify-between space-x-4">
            <BookCardItem
              title="Price Match Guarantee"
              description="We'll match the price if you find it cheaper elsewhere."
              bgColor="bg-pink-600"
              textColor="text-white"
              hoverColor="bg-pink-700"
              type="2"
            />
            <BookCardItem
              title="No Fee on Credit & Debit Card Transactions"
              description="We don't charge extra for card transactions."
              bgColor="bg-blue-600"
              textColor="text-white"
              hoverColor="bg-blue-700"
              type="2"
            />
            <BookCardItem
              title="Exclusive Deals for Hundreds of Destinations"
              description="Get the best deals for your favorite destinations."
              bgColor="bg-yellow-600"
              textColor="text-white"
              hoverColor="bg-yellow-700"
              type="2"
            />
          </div>
        )}
        {type === "3" && (
          <div className="flex items-center justify-between space-x-4">
            <RatingCardItem
              username="Ruby Ryan"
              reviewText="Bliss Flights is the UK's largest independent travel agent. Whether you'd like a short UK break, a sunny package holiday, an all inclusive getaway or something else entirely."
              rating={4.9}
              maxRating={5}
            />
            <RatingCardItem
              username="Ruby Ryan"
              reviewText="Bliss Flights is the UK's largest independent travel agent. Whether you'd like a short UK break, a sunny package holiday, an all inclusive getaway or something else entirely."
              rating={4.9}
              maxRating={5}
            />
            <RatingCardItem
              username="Ruby Ryan"
              reviewText="Bliss Flights is the UK's largest independent travel agent. Whether you'd like a short UK break, a sunny package holiday, an all inclusive getaway or something else entirely."
              rating={4.9}
              maxRating={5}
            />
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
