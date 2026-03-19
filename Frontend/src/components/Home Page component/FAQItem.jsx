import styles from "./FAQItem.module.css";

function FAQItem({ faq, index, openIndex, setOpenIndex, isLastVisible, handleArrowClick }) {
  const isOpen = openIndex === index;

  const onArrowClick = () => {
    setOpenIndex(isOpen ? null : index);
    if (isLastVisible && !isOpen) {
      handleArrowClick();
    }
  };

  return (
    <div className={styles.card}>
      <button className={styles.button} onClick={onArrowClick}>
        <span className={styles.question}>{faq.q}</span>
        <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="16"
            height="16"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      {isOpen && <p className={styles.answer}>{faq.a}</p>}
    </div>
  );
}

export default FAQItem;