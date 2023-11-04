import { useState, useEffect } from "react";
import { getQuestions } from "@/data/questionObj";
import axios from "axios";

let testing = true;
export const useQuestions = () => {
  const [questions, setQuestions] = useState();

  const [response, setResponse] = useState({});
  const questionData = getQuestions;
  useEffect(() => {
    const fetchQuestions = async () => {
      if (testing) return setQuestions(questionData);
      await axios
        .get("/api/hello")
        .then(setQuestions)
        .catch((e) => console.error(e));
    };
    fetchQuestions();
  }, []);
  return { questions };
};
