import { VERSION_ONE_TEMPLATE } from "@/templates/version_one";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

let testing = false;
export const useQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = questions?.[currentQuestionIndex];

  useEffect(() => {
    const fetchQuestions = async () => {
      if (testing) return setQuestions(VERSION_ONE_TEMPLATE);
      // await axios
      //   .get("/api/fetchData")
      //   .then(setQuestions)
      //   .catch((e) => console.error(e));
      try{
        const data = await axios.get("/api/fetchData");
        return setQuestions(data || []); // thought the issue could be that questions is not being defined
      }catch(e) {
        console.error(e);
      }
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

    console.log( response.data );
  };

  // can confirm questions is empty when calling api
  //console.log("questions:" + questions);

  //const testComplete = questions.every((q) => q.responseId !== "");

  return {
    questions,
    handleClick,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    handleNext,
    handleSubmit,
  };
};
