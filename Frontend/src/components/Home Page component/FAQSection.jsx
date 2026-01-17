import React, { useState } from "react";
import FAQData from "../../data/FAQData";
import FAQItem from "./FAQItem";

export default function FAQSection() {
  const [visibleCount, setVisibleCount] = useState(5);
  const [openIndex, setOpenIndex] = useState(null);

  const handleArrowClick = () => {
    setVisibleCount((prev) => Math.min(prev + 2, FAQData.length));
  };
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-10">
      FAQ Section
      </h2>

      <div className="space-y-4">
        {FAQData.slice(0, visibleCount).map((faq, index) => (
          <FAQItem
            key={index}
            faq={faq}
            index={index}
            openIndex={openIndex}
            setOpenIndex={setOpenIndex}
            isLastVisible={index === visibleCount - 1} // pass prop
            handleArrowClick={handleArrowClick} // pass prop
          />
        ))}
      </div>
    </div>
  );
}
