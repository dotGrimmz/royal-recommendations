import Image from "next/image";
import { useState, useEffect } from "react";
export const CardContainer = ({
  options,
  question,
  handleClick,
  imgSrc,
  selectLimit,
  selectedResponseId,
}) => {
  console.log({ imgSrc, selectLimit });

  const calculateGridCols = () => {
    const itemCount = options?.length;

    if (itemCount === 3) {
      return "grid-cols-3";
    }
    if (itemCount > 4) {
      return "grid-cols-4";
    }

    return "grid-cols-2";
  };

  return (
    <div className="card min-w-[40vw] min-h-[300px]  bg-base-100 shadow-xl image-full overflow-hidden">
      {imgSrc && (
        <figure>
          <Image
            alt="bg-img"
            fill={true}
            className="object-cover overflow-hidden"
            src={imgSrc}
          />
        </figure>
      )}
      <div className="card-body gap-16">
        <h2 className="card-title mx-auto text-white text-3xl">{question}</h2>
        <div className={`grid  ${calculateGridCols()}  gap-16`}>
          {options?.map((data, index) => {
            return (
              <ItemBtnWrapper
                key={index}
                data={data}
                handleClick={handleClick}
                selectedResponseId={selectedResponseId}
                selectLimit={selectLimit}
              />
            );
            // const { name, id, imgSrc: img } = data;
            // const imgStyles = img
            //   ? {
            //       backgroundImage: `url(${img})`,
            //       backgroundSize: "cover",
            //       backgroundPosition: "center",
            //     }
            //   : null;
            // return (
            //   <ItemBtn
            //     key={name}
            //     imgStyles={imgStyles}
            //     handleClick={handleClick}
            //     id={id}
            //     limitReached={limitReached}
            //     className="btn btn-primary min-h-[60px]  text-white-500 text-2xl "
            //   >
            //     {!imgStyles && name}
            //   </ItemBtn>
            // );
          })}
        </div>
      </div>
    </div>
  );
};

// i hate this paradigm so much for jsx but
// it'll work for now
const ItemBtnWrapper = ({ data, handleClick, selectLimit }) => {
  const { name, id, imgSrc: img } = data;
  console.log({ selectLimit });
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const imgStyles = img
    ? {
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : null;

  const limitReached = selectedAnswers.length === selectLimit;
  const handleMultipleAnswers = (id) => {
    if (selectLimit === 1) {
      return handleClick(id);
    }
    // if (limitReached) {
    //   const updatedArr = [...selectedAnswers, id];
    //   return setSelectedAnswers(updatedArr);
    // }
    if (selectedAnswers.length == 3) {
      return handleClick([parseInt(selectedAnswers.join())]);
    }
    // return handleClick(selectedAnswers.join());
  };

  // setSelectedResponseIds((prev) => {
  //   console.log({ prev, id, selectedResponseId });
  //   prev[currentQuestionIndex] = id;
  //   return prev;
  // });
  const isSelected = selectedAnswers.includes(id);
  console.log(selectLimit, selectedAnswers.length, isSelected);

  return (
    <div>
      <ItemBtn
        limitReached={limitReached}
        imgStyles={imgStyles}
        id={id}
        name={name}
        handleClick={handleMultipleAnswers}
        isSelected={isSelected}
      />
    </div>
  );
};

const ItemBtn = ({
  name,
  id,
  imgStyles,
  handleClick,
  limitReached,
  selectedResponseId,
  isSelected,
}) => {
  //reset state incase user goes back - could be handy

  return (
    <button
      key={name}
      style={imgStyles}
      onClick={() => handleClick(id)}
      className={`btn btn-primary min-h-[60px]  text-white-500 text-2xl ${
        isSelected && "animate-bounce"
      } `}
    >
      {!imgStyles && name}
    </button>
  );
};
