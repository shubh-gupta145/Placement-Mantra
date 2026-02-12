import styles from "./FAqItem.module.css"
function FAQItem({ faq, index, openIndex, setOpenIndex, isLastVisible, handleArrowClick }) {
  const isOpen = openIndex === index;

  const onArrowClick = () => {
    setOpenIndex(isOpen ? null : index);
    if (isLastVisible && !isOpen) {
      handleArrowClick();
    }
  };

  return (
    <div className="border rounded-2xl p-5 bg-white shadow-sm">
      <button
        type="button"
        className="w-full flex items-center justify-between gap-4 text-left"
        onClick={onArrowClick}
      >
        <span className={`${styles.s} text-lg font-medium text-gray-900`}>{faq.q}</span>

        <span
          className={`w-9 h-9 flex items-center justify-center rounded-full transform transition-all duration-300 ${
            isOpen ? "rotate-180 bg-gray-900 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      {isOpen && <p className={` ${styles.p} mt-4 text-gray-600 leading-relaxed`}>{faq.a}</p>}
    </div>
  );
}

export default FAQItem;
