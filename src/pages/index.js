import { Questions } from "@/components/Questions";
import { useQuestions } from "@/hooks/useQuestions";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function Home() {
  const {
    questions,
    handleClick,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    handleNext,
    handleSubmit,
  } = useQuestions();
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
