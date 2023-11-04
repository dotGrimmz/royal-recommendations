import { CardContainer } from "./CardContainer";
import { useState } from "react";
export const Questions = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedResponseId, setSelectedResponseIds] = useState([]);

  // const enableNext =
  //   selectedResponseId.length > 0 &&
  //   selectedResponseId.length === questions.selectLimit;
  console.log({ selectedResponseId });

  const handleClick = (id) => {
    /* 
    this function will need know the state 
     of question we are on to push to question response id
    */
    const limit = questions?.questionsArr[currentQuestionIndex]?.selectLimit;
    setSelectedResponseIds((prev) => {
      console.log({ prev, id, selectedResponseId });
      // if (limit === 1) {
      //   return [id];
      // }
      return prev;
    });
  };
  // needs a setter function that takes the propName and value to overwrite
  // console.log({ questions, selectedResponseId }, "from questions");

  /* I want to create something like a controlled carousel
    when they submit an answer it does an animation to the next component
  */
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
