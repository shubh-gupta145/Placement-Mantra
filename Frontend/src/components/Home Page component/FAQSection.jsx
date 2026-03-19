import React, { useState } from "react";
import FAQItem from "./FAQItem";
import styles from "./FAQSection.module.css";

function FAQSection({ data = [] }) {
  const [visibleCount, setVisibleCount] = useState(5);
  const [openIndex, setOpenIndex] = useState(null);

  const handleArrowClick = () => {
    setVisibleCount((prev) => Math.min(prev + 2, data.length));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>FAQ Section</h2>
      <div className={styles.list}>
        {data.slice(0, visibleCount).map((faq, index) => (
          <FAQItem
            key={index}
            faq={faq}
            index={index}
            openIndex={openIndex}
            setOpenIndex={setOpenIndex}
            isLastVisible={index === visibleCount - 1}
            handleArrowClick={handleArrowClick}
          />
        ))}
      </div>
    </div>
  );
}

export default FAQSection;