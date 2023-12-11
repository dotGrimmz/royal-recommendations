import { VERSION_ONE_TEMPLATE } from "@/templates/version_one";
import { MOCK_RESP } from "@/templates/mock_response";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

let testing = false;
export const useQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [recommendations, setRecommendations] = useState();
  const currentQuestion = questions?.[currentQuestionIndex];

  useEffect(() => {
    const fetchQuestions = async () => {
      if (testing) return setQuestions(VERSION_ONE_TEMPLATE);
      // await axios
      //   .get("/api/fetchData")
      //   .then(setQuestions)
      //   .catch((e) => console.error(e));
      try {
        const data = await axios.get("/api/fetchData");
        return setQuestions(data.data || []); // thought the issue could be that questions is not being defined
      } catch (e) {
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
    // testing = true;
    const submissionPayload = questions.map((q) => {
      return {
        topic: q.name,
        id: q.responseId,
        response: q.options.find((item) => (item.id = q.responseId))?.name,
      };
    });

    console.log(submissionPayload, " post data");
    if (testing) {
      setTimeout(() => setRecommendations(MOCK_RESP), 2000);
    }
    const response = await axios.post("/api/buildRecList", submissionPayload);

    if (response.ok) console.log("resp 200 on the client");
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
    recommendations,
  };
};
