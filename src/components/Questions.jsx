import { CardContainer } from "./CardContainer";
import { useState } from "react";
export const Questions = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // needs a setter function that takes the propName and value to overwrite
  console.log({ questions }, "from questions");

  /* I want to create something like a controlled carousel
    when they submit an answer it does an animation to the next component
  */
  console.log(questions?.questionsArr[currentQuestionIndex]?.imgSrc);
  return (
    <div className="flex  items-center justify-center h-full">
      <div>
        {currentQuestionIndex < questions?.questionsArr.length ? (
          <CardContainer
            question={questions?.questionsArr[currentQuestionIndex]?.question}
            options={questions?.questionsArr[currentQuestionIndex]?.options}
            imgSrc={questions?.questionsArr[currentQuestionIndex]?.imgSrc}
          />
        ) : (
          <div>All questions Answered</div>
        )}

        <div className="flex justify-between pt-6 m">
          <button
            className="btn btn-primary min-w-[120px]"
            onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
            disabled={currentQuestionIndex === 0}
          >
            Back
          </button>
          <button
            className="btn btn-primary min-w-[120px]"
            onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
