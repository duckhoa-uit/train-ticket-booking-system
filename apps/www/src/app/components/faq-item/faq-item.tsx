"use client";

import React from "react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../accordion/accordion";

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  return (
    <div className="w-full p-4">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>{question}</AccordionTrigger>
          <AccordionContent>{answer}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FaqItem;
