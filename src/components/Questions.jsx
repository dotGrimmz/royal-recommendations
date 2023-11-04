import { CardContainer } from "./CardContainer";
export const Questions = ({ questions }) => {
  // needs a setter function that takes the propName and value to overwrite
  console.log({ questions }, "from questions");

  /* I want to create something like a controlled carousel
    when they submit an answer it does an animation to the next component
  */
  return (
    <div className="flex  items-center justify-center h-full">
      <CardContainer
        question={questions?.questionsArr[0]?.question}
        options={questions?.questionsArr[0]?.options}
        imgSrc={questions?.questionsArr[0]?.imgSrc}
      />
    </div>
  );
};
