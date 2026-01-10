import { useState } from "react";

const allFaqs = [
  { q: "What is ResumeCraft?", a: "ResumeCraft is a resume-building platform." },
  { q: "Is ResumeCraft free?", a: "Yes, basic features are free." },
  { q: "Can I download my resume?", a: "Yes, you can download it as PDF." },
  { q: "Is it ATS friendly?", a: "Yes, resumes are optimized for ATS." },
  { q: "Can I customize templates?", a: "Yes, templates are customizable." },
  { q: "Do I need an account?", a: "Account is optional for basic use." },
  { q: "Can I edit my resume later?", a: "Yes, you can edit anytime." },
  { q: "Does it support multiple resumes?", a: "Yes, you can create multiple resumes." },
  { q: "Is my data safe?", a: "Your data is fully secured." },
  { q: "Can freshers use it?", a: "Yes, it is ideal for freshers." },
  { q: "Does it support job-specific resumes?", a: "Yes, you can tailor resumes." },
  { q: "Is it mobile responsive?", a: "Yes, it works on all devices." },
  { q: "Can I share resume links?", a: "Yes, shareable links are available." },
  { q: "Does it support different languages?", a: "Currently English is supported." },
  { q: "How can I contact support?", a: "You can contact via email." }
];

 function FAQSection() {
  const [visibleCount, setVisibleCount] = useState(5);
  const [openIndex, setOpenIndex] = useState(null);

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 2, allFaqs.length));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-10">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {allFaqs.slice(0, visibleCount).map((faq, index) => (
          <div
            key={index}
            className="border rounded-2xl p-5 bg-white shadow-sm"
          >
            <button
              type="button"
              className="w-full flex items-center justify-between gap-4 text-left"
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            >
              <span className="text-lg font-medium text-gray-900">
                {faq.q}
              </span>

              {/* Arrow */}
              <span
                className={`w-9 h-9 flex items-center justify-center rounded-full transform transition-all duration-300 ${
                  openIndex === index
                    ? "rotate-180 bg-gray-900 text-white"
                    : "bg-gray-200 text-gray-700"
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

            {openIndex === index && (
              <p className="mt-4 text-gray-600 leading-relaxed">
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>

      {visibleCount < allFaqs.length && (
        <div className="text-center mt-10">
          <button
            type="button"
            onClick={loadMore}
            className="px-6 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition"
          >
            Load More Questions
          </button>
        </div>
      )}
    </div>
  );
}
export default FAQSection;