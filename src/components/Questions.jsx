import { CardContainer } from "./CardContainer";
import { motion, AnimatePresence } from "framer-motion";
export const Questions = ({
  questions,
  handleClick,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  handleNext,
  handleSubmit,
}) => {
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="overflow-x-hidden">
        {currentQuestionIndex < questions?.length ? (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ x: "-100vw" }}
                animate={{ x: 0 }}
                transition={{ type: "spring", duration: 1, bounce: 0.3 }}
                exit={isLastQuestion ? { opacity: 0 } : { x: "100vw" }}
                key={currentQuestionIndex}
              >
                <CardContainer
                  question={questions?.[currentQuestionIndex]?.question}
                  options={questions?.[currentQuestionIndex]?.options}
                  imgSrc={questions?.[currentQuestionIndex]?.imgSrc}
                  handleClick={handleClick}
                  responseId={questions?.[currentQuestionIndex]?.responseId}
                />
              </motion.div>
            </AnimatePresence>
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
                onClick={isLastQuestion ? handleSubmit : handleNext}
              >
                {isLastQuestion ? "Submit" : "Next"}
              </button>
            </div>
          </>
        ) : (
          <>
            <span className="loading loading-ring  w-40"></span>
          </>
        )}
      </div>
    </div>
  );
};
