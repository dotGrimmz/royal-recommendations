import { useState, useEffect } from "react";
import { questionsArr } from "@/data/questionObj";
import axios from "axios";

let testing = false;
export const useQuestions = () => {
  const [questions, setQuestions] = useState();

  const [response, setResponse] = useState([
    {
      questionOne: [],
    },
  ]);

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

          const genreOpts = [...resData.genres];

          console.log({ resData, questionsArr, platformOpts, genreOpts });
        })
        .catch((e) => console.error(e));
    };
    fetchQuestions();
  }, []);
  return { questions };
};
