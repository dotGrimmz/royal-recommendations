import { Questions } from "@/components/Questions";
import { useQuestions } from "@/hooks/useQuestions";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Recommendations } from "@/components/Recommendations";
import { MOCK_RESP } from "@/templates/mock_response";

export default function Home() {
  const {
    questions,
    handleClick,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    handleNext,
    handleSubmit,
    recommendations,
  } = useQuestions();

  // if (MOCK_RESP) {
  //   return <Recommendations recommendations={MOCK_RESP} />;
  // }
  return (
    <>
      <Questions
        questions={questions}
        handleClick={handleClick}
        currentQuestionIndex={currentQuestionIndex}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
        handleNext={handleNext}
        handleSubmit={handleSubmit}
      />
      <ToastContainer />
    </>
  );
}
