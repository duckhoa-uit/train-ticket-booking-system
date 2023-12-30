"use client";

import React, { useState } from "react";

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-96 rounded-md border-2 border-gray-200 p-4">
      <dt>
        <button
          type="button"
          className="flex w-full items-start justify-between text-left text-gray-400"
          aria-controls="faq-content"
          aria-expanded="false"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="font-medium text-gray-900">{question}</span>
          <span className="ml-6 flex h-7 items-center">
            <svg
              className={`transform transition-transform ${isOpen ? "-rotate-180" : "rotate-0"}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>
      </dt>
      <dd className={`mt-2 pr-12 ${isOpen ? "block" : "hidden"}`} id="faq-content">
        <p className="text-base text-gray-500">{answer}</p>
      </dd>
    </div>
  );
};

export default FaqItem;
