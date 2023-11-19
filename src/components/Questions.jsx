import { CardContainer } from "./CardContainer";
export const Questions = ({
  questions,
  handleClick,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  handleNext,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div>
        {currentQuestionIndex < questions?.length ? (
          <CardContainer
            question={questions?.[currentQuestionIndex]?.question}
            options={questions?.[currentQuestionIndex]?.options}
            imgSrc={questions?.[currentQuestionIndex]?.imgSrc}
            handleClick={handleClick}
            responseId={questions?.[currentQuestionIndex]?.responseId}
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
        <button className="btn btn-primary min-w-[120px]" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};
