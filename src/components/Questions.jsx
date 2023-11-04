import { CardContainer } from "./CardContainer";
import { useState } from "react";
export const Questions = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedResponseId, setSelectedResponseIds] = useState([]);
  console.log({ questions });
  const handleClick = (id) => {
    console.log(selectedResponseId[currentQuestionIndex], "current value");

    setSelectedResponseIds((prev) => {
      console.log({ prev, id, selectedResponseId });
      prev[currentQuestionIndex] = id;
      return prev;
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div>
        {currentQuestionIndex < questions?.questionsArr.length ? (
          <CardContainer
            question={questions?.questionsArr[currentQuestionIndex]?.question}
            options={questions?.questionsArr[currentQuestionIndex]?.options}
            imgSrc={questions?.questionsArr[currentQuestionIndex]?.imgSrc}
            handleClick={handleClick}
            selectLimit={
              questions?.questionsArr[currentQuestionIndex]?.selectLimit
            }
            selectedResponseId={selectedResponseId}
          />
        ) : (
          <div>All questions Answered</div>
        )}
      </div>
      <div className="flex justify-around pt-6 w-full">
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
  );
};
