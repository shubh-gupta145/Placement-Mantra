import { useState } from "react";
import styles from "./TestPage.module.css";
import { useLocation } from "react-router-dom";
import ResultContainer from "./ResultContainer";
import useFeatureTrack from '../../utils/useFeatureTrack';

function TestPage() {

  // ✅ Feature track — Test Page
  useFeatureTrack('test-page');

  const location  = useLocation();
  const questions = location.state || [];

  const [current,    setCurrent]    = useState(0);
  const [selected,   setSelected]   = useState(null);
  const [answers,    setAnswers]     = useState({});
  const [result,     setResult]      = useState(null);
  const [showResult, setShowResult]  = useState(false);

  if (questions.length === 0) {
    return <h2>No Questions Found</h2>;
  }

  const handleOption = (index) => {
    setSelected(index);
    setAnswers({
      ...answers,
      [current]: index
    });
  };

  const submitTest = () => {
    let correct = 0;

    questions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        correct++;
      }
    });

    let wrong      = questions.length - correct;
    let percentage = ((correct / questions.length) * 100).toFixed(2);

    setResult({ correct, wrong, percentage });
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setSelected(answers[current + 1] ?? null);
    } else {
      submitTest();
    }
  };

  const prevQuestion = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setSelected(answers[current - 1] ?? null);
    }
  };

  if (showResult) {
    return <ResultContainer result={result} />;
  }

  return (
    <div className={styles.bodyContainer}>
      <div className={styles.Container}>

        {/* Question */}
        <div className={styles.QuestionContainer}>
          <p>
            Q.{current + 1} {questions[current].question}
          </p>
        </div>

        {/* Options */}
        <div className={styles.AnswerContainer}>
          {questions[current].options.map((opt, i) => (
            <div
              key={i}
              className={`${styles.OptionContainer} ${
                selected === i ? styles.active : ""
              }`}
              onClick={() => handleOption(i)}
            >
              <span>{opt}</span>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className={styles.Navigation}>
          <div className={styles.LeftButtons}>
            <button onClick={prevQuestion}>⬅</button>
          </div>
          <button
            className={styles.NextButton}
            onClick={nextQuestion}
          >
            {current === questions.length - 1 ? "Submit Test" : "Next ➡"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default TestPage;