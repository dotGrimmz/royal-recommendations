import { useState, useEffect } from "react";
import { questionsArr } from "@/data/questionObj";
import axios from "axios";
import { toast } from "react-toastify";

let testing = true;
export const useQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = questions?.[currentQuestionIndex];

  useEffect(() => {
    const fetchQuestions = async () => {
      if (testing) return setQuestions(questionsArr);
      await axios
        .get("/api/fetchData")
        .then((data) => {
          const { data: resData } = data;
          const platformOpts = questionsArr[0].options.map((item, index) => {
            return {
              ...item,
              name: resData.platforms[index].name,
              id: resData.platforms[index].id,
            };
          });

          setQuestions([{ ...questionsArr[0], options: platformOpts }]);

          const genreOpts = [...resData.genres];
          setQuestions((prev) => {
            const updated = [
              ...prev,
              { ...questionsArr[1], options: genreOpts },
            ];
            return updated;
          });
          console.log({ resData, questionsArr, platformOpts, genreOpts });
        })
        .catch((e) => console.error(e));
    };
    fetchQuestions();
  }, []);

  const handleClick = (id) => {
    return setQuestions((prev) => {
      prev[currentQuestionIndex].responseId = id;
      return [...prev];
    });
  };

  const handleNext = () => {
    if (currentQuestion.responseId) {
      return setCurrentQuestionIndex((prev) => prev + 1);
    }
    return toast("Select Response!", {
      position: "bottom-left",
      autoClose: 1200,
      hideProgressBar: true,
      closeOnClick: true,
      theme: "colored",
      type: "info",
    });
  };

  const handleSubmit = async () => {
    const submissionPayload = questions.map((q) => {
      return {
        name: q.name,
        id: q.responseId,
      };
    });

    const response = await axios.post("/api/buildRecList", submissionPayload);

    console.log({ submissionPayload });
  };

  const testComplete = questions.every((q) => q.responseId !== "");

  return {
    questions,
    handleClick,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    handleNext,
    handleSubmit,
  };
};
