import { useState, useEffect } from "react";
import { getQuestions } from "@/data/questionObj";
import axios from "axios";

let testing = true;
export const useQuestions = () => {
  const [questions, setQuestions] = useState();

  const [response, setResponse] = useState([
    {
      questionOne: [],
    },
  ]);
  const questionData = getQuestions;

  const handleResponse = ({ name, newVal }) => {
    // needs to take in prop name
    // and newValueObj
    setResponse((prev) => {
      return {
        ...prev,
      };
    });
  };
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
